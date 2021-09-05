import { BALANCE_OPERATIONS } from '../constants'

interface IOperation {
  user: string;
  operation: BALANCE_OPERATIONS;
  balance: number;
  operationDate: string;
}

export {
  IOperation
}
