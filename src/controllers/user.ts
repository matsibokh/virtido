import * as express from 'express'
import UserService from '../services/user'

const router = express.Router()

router.post('/', async (req, res) => {
  const { user, password } = req.body
  try {
    await UserService.cretaeUser({
      user: user?.trim(),
      password: password?.trim()
    })
    res.status(201);
    res.send('User was successfully created')
  } catch (e) {
    res.status(400)
    res.send(e.message)
  }
})

router.put('/', async (req, res) => {
  const { user, operation, amount } = req.body;
  try {
    await UserService.updateBalance({
      user: user?.trim(),
      operation: operation?.trim(),
      amount: Math.abs(Number(amount))
    })
    res.status(200)
    res.send('Balance was successfully updated')
  } catch(e){
    res.status(400)
    res.send(e.message)
  }
})

router.get('/:userId', async (req, res) => {
  const { userId } = req.params
  const userData = await UserService.getUser(userId)
  res.status(200)
  res.send(userData)
})

export default router
