import * as express from 'express'
import OperationsModel from '../models/opeerations'

const router = express.Router()

router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const userOperations = await OperationsModel.getOperations(userId)
  res.send(userOperations)
})

export default router
