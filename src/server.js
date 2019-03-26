const express = require('express')
const path = require('path')

//Import Mongoose config and connect to DB
require('./db/mongoose')

//Import Express Routers
const userRouter = require('./routers/user')
const thoughtRouter = require('./routers/thought')
const realizationRouter = require('./routers/realization')

//Create Express app
const app = express()

//Set port var from env variable
const port = process.env.PORT

//Middleware to parse request bodies
app.use(express.json())

//API Routers
app.use(userRouter)
app.use(thoughtRouter)
app.use(realizationRouter)

//Setup issuance of static site
app.use(express.static(path.join(__dirname, '../client/build')))

//Catch-all route to return to main page (instead of 404)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

//Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
