import * as mongoose from 'mongoose'
import { CollectionBase as ICollectionBase } from 'mongoose'
import { usersScheme } from './schemas'
import {
  IUser,
  IUserCreateInput,
  ICreateUserOutput,
  IUpdateUserOutput
} from '../interfaces/user'

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

class User {
  private Users;
  private dbConnection;

  private initUserSchema = () => {
    if (!this.Users) {
      this.Users = (function initSchema () {
        return mongoose.model('Users', usersScheme)
      })()
    }
  }

  private initDbConnection = async (): Promise<ICollectionBase> => {
    if (!this.dbConnection) {
      this.dbConnection = await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
    }
    this.initUserSchema()
    return this.dbConnection
  }

  public createUser = async (newUser: IUserCreateInput): Promise<ICreateUserOutput> => {
    await this.initDbConnection()
    const user = new this.Users({
      user: newUser.user,
      password: newUser.password,
      balance: newUser.balance,
      created: Date.now()
    })
    await user.save();
    return{
      success: true,
      message: 'User was successfully created'
    }
  };

  public updateUser = async(userData): Promise<IUpdateUserOutput> => {
    const filter = { user: userData.user };
    const update = { balance: userData.balance };
    await this.Users.findOneAndUpdate(filter, update);
    return {
      success: true,
      message: 'Balance was successfully updated'
    }
  }

  public getUser = async (userName: string): Promise<IUser | null> => {
    await this.initDbConnection()
    return this.Users.findOne({ userName })
  };
}

export default new User()
