const express = require('express')
const app = express()
const port = 5000
const http = require('http')
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

// Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// Database Connection
require("./app/config/db.connection")(mongoose)
// Routes
require("./app/routes/index")(app)
// Sockets
require("./app/sockets/index")(io)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})