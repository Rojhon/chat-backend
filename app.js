const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");

// Database Connection
require("./app/config/db.connection")(mongoose)
// Routes
require("./app/routes/index")(app)

// Middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})