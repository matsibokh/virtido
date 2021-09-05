import * as mongoose from 'mongoose'
import { CollectionBase as ICollectionBase } from 'mongoose'
import { operationsScheme } from './schemas'
import { IOperation } from '../interfaces/operation'

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

class OperationsHistory {
  private Operations;
  private dbConnection;

  private initOperationsSchema = () => {
    if (!this.Operations) {
      this.Operations = (function initSchema () {
        return mongoose.model('Operations', operationsScheme)
      })()
    }
  }

  private initDbConnection = async (): Promise<ICollectionBase> => {
    if (!this.dbConnection) {
      this.dbConnection = await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
    }
    this.initOperationsSchema()
    return this.dbConnection
  }

  public saveOperationInfo = async (data): Promise<void> => {
    await this.initDbConnection()
    const operation = new this.Operations({
      user: data.user,
      operation: data.operation,
      amount: data.amount,
      operationDate: Date.now()
    })
    await operation.save();
  };

  public getOperations = async (userName: string): Promise<IOperation[] | null> => {
    await this.initDbConnection()
    return this.Operations.find({ userName })
  };
}

export default new OperationsHistory()
