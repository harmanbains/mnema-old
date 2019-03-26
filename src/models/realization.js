const mongoose = require('mongoose')

//Create Realization Schema
const realizationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

// Alter realization to only return public data when converted to JSON
// And return human readable strings for dates
realizationSchema.methods.toJSON = function () {
  const realization = this
  const realizationObject = realization.toObject()

  delete realizationObject.__v
  delete realizationObject.user

  realizationObject.createdAt = realizationObject.createdAt.toLocaleString('en-US', {timeZone: 'America/Los_Angeles'})
  realizationObject.updatedAt = realizationObject.updatedAt.toLocaleString('en-US', {timeZone: 'America/Los_Angeles'})


  return realizationObject
}

//Create Realization Model
const Realization = mongoose.model('Realization', realizationSchema)



module.exports = Realization
