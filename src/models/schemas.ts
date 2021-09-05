import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const usersScheme = new Schema({
  user: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  created: Date
})

const operationsScheme = new Schema({
  user: {
    type: String,
    required: true
  },
  operation: {
    type: String,
    enum: ['WITHDRAW', 'DEPOSIT'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  operationDate: {
    type: Date,
    required: true
  }
})

export {
  usersScheme,
  operationsScheme
}
