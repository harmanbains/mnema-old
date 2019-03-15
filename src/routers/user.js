const express = require('express')
const router = new express.Router()
const auth = require ('../middleware/auth')
const User = require('../models/user')

//Create new User
router.post('/api/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

//User login
router.post('/api/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
})

router.post('/api/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()

  } catch (e) {
    res.status(500).send()
  }
})

router.post('/api/user/logoutall', auth,  async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

//Get user information
router.get('/api/user/me', auth, async (req, res) => {
  res.send(req.user)
})

//Route to update user credentials currently not implemented in UI

// router.patch('/api/user/me', auth, async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['email', 'password']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//
//   if (!isValidOperation) {
//     return res.status(400).send({error: 'Invalid updates' })
//   }
//
//   try {
//     updates.forEach((update) => req.user[update] = req.body[update])
//     await req.user.save()
//     res.send(req.user)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

router.delete('/api/user/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
