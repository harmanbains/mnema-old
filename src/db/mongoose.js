const mongoose = require('mongoose')

//Connect to DataBase
//Certain flags set to prevent use of deprecated MongoDB methods
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
