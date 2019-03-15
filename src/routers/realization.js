const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Realization = require('../models/realization')

//Create new Realization
router.post('/api/realization', auth, async (req, res) => {
  const realization = new Realization({
    text: req.body.text,
    user: req.user._id
  })
  try {
    await realization.save()
    res.status(201).send(realization)
  } catch (error) {
    res.status(400).send(error)
  }
})

//Get all realizations
router.get('/api/realizations', auth, async (req, res) => {
  try {
    const realizations = await Realization.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.send(realizations)
  } catch (error) {
    res.status(500).send()
  }
})

//Get realization by ID
router.get('/api/realization/:id', auth, async (req, res) => {
  const _id = req.params.id
  console.log(req)

  try {
    const realization = await Realization.findOne({ _id, user: req.user._id })

    if (!realization) {
      res.status(404).send()
    } else {
      res.send(realization)
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/api/realization/:id', auth, async (req, res) => {
  try {
    const realization = await Realization.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!realization) {
      res.status(404).send()
    } else {
      res.send(realization)
    }
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
