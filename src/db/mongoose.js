const mongoose = require('mongoose')

//Connect to DataBase
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
