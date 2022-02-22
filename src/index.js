const express = require("express");
const http = require('http')

const app = express()
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

// const { getUsername } = require("./middlewares");
const registerMessageHandler = require('./handleMessage');
const registerUserHandlers = require('./handleUser')
const registerDisconnectionHandlers = require('./handleDisconnection')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const users = {
  count: 0
}

// io.use(getUsername)
io.use((socket, next) => {
  const handshakeData = socket.request
  socket.username = handshakeData._query['username']
  users[socket.username] = socket.id

  console.log('>> middleware', new Date().getTime());
  next()
})

io.on('connection', (socket) => {
  users.count++
  
  console.log(`${socket.username} HAS ENTERED THE CHAT`)
  socket.broadcast.emit('send-message', `${socket.username} HAS ENTERED THE CHAT`)

  registerUserHandlers(io, socket)
  registerMessageHandler(io, socket, users)
  registerDisconnectionHandlers(io, socket, users)
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
})