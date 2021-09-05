import { BALANCE_OPERATIONS } from '../constants'

const createUserValidation = (userData): string[] => {
  const errors = []
  if (!userData.user) {
    errors.push('User is not specified')
  }

  if (!userData.password) {
    errors.push('Password is not specified')
  }
  return errors
}

const updateBalanceValidation = (userData) => {
  const errors = []
  if (!userData.user) {
    errors.push('User is not specified')
  }

  if (!userData.operation) {
    errors.push('Operation is not specified')
  }

  if (!Object.values(BALANCE_OPERATIONS).includes(userData.operation)) {
    errors.push(`Unknown operation '${userData.operation}'`)
  }

  if (typeof(userData.amount) != 'number' || userData.amount == NaN) {
    errors.push(`Amount '${userData.amount}' is incorrect`)
  }

  if (userData.amount%100 != 0) {
    errors.push(`Amount '${userData.amount}' should be multiple of 100`)
  }
  return errors
} 

export {
  createUserValidation,
  updateBalanceValidation
}
