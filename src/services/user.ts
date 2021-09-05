import UserModel from '../models/user'
import OperationsModel from '../models/opeerations'
import { createUserValidation, updateBalanceValidation } from '../validation/user'
import { DEFAULT_USER_BALANCE } from '../constants'

class User {
  public cretaeUser = async (userData) => {
    const validation = createUserValidation(userData)
    if (validation.length > 0) {
      let errorMessage = 'Invalid create user input: '
      validation.forEach(msg => {
        errorMessage += `${msg};`
      })
      throw new Error(errorMessage)
    }
    userData.balance = DEFAULT_USER_BALANCE
    try {
      await UserModel.createUser(userData)
    } catch (e) {
      if (e.message.includes('duplicate key error collection')) {
        throw new Error('Error: user already exists')
      }
      throw e
    }
  }

  public getUser = async (userId: string) => {
    const { user, password, balance } = await UserModel.getUser(userId)
    return {
      user,
      password,
      balance
    }
  }

  public updateBalance = async (userData) => {
    const validation = updateBalanceValidation(userData);
    const { user, operation, amount } = userData;
    if (validation.length > 0) {
      let errorMessage = 'Invalid balance updating: '
      validation.forEach(msg => {
        errorMessage += `${msg};`
      })
      throw new Error(errorMessage)
    }

    const { balance } = await UserModel.getUser(user);
    if (operation === 'WITHDRAW' && balance < amount) {
      throw new Error ('Current balance less than withdraw amount');
    }
    await UserModel.updateUser({
      user,
      balance: (operation === 'WITHDRAW') ? balance - amount : balance + amount
    });
    await OperationsModel.saveOperationInfo(userData)
  }
}

export default new User()
