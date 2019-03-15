const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Thought = require('../models/thought')

//Create new Thought
router.post('/api/thought', auth, async (req, res) => {
  const thought = new Thought({
    text: req.body.text,
    user: req.user._id
  })
  try {
    await thought.save()
    res.status(201).send(thought)
  } catch (error) {
    res.status(400).send(error)
  }
})

//Get all thoughts
router.get('/api/thoughts', auth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.send(thoughts)
  } catch (error) {
    res.status(500).send()
  }
})

//Get thought by ID
router.get('/api/thought/:id', auth, async (req, res) => {
  const _id = req.params.id
  console.log(req)

  try {
    const thought = await Thought.findOne({ _id, user: req.user._id })

    if (!thought) {
      res.status(404).send()
    } else {
      res.send(thought)
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

//update thought
router.patch('/api/thought/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['text', 'reviewed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates' })
  }

  try {
    const thought = await Thought.findOne({  _id: req.params.id, user: req.user._id})

    if (!thought) {
      res.status(404).send()
    } else {
      updates.forEach((update) => thought[update] = req.body[update])
      await thought.save()
      res.send(thought)
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/api/thought/:id', auth, async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id, user: req.user._id })

    if (!thought) {
      res.status(404).send()
    } else {
      res.send(thought)
    }
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
