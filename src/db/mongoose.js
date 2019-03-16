const mongoose = require('mongoose')
console.log(process.env.MONGODB_URI)
console.log('HEY HEY HEY')

//Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
