const express = require('express')
const path = require('path')

require('./db/mongoose')

const userRouter = require('./routers/user')
const thoughtRouter = require('./routers/thought')
const realizationRouter = require('./routers/realization')

const app = express()
const port = process.env.PORT

//Middleware to parse request bodies
app.use(express.json())

//API Routers
app.use(userRouter)
app.use(thoughtRouter)
app.use(realizationRouter)

//Setup issuance of static site
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
