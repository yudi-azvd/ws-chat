const express = require("express");
const http = require('http')

const app = express()
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

const { getUsername } = require("./middlewares");
const registerMessageHandler = require('./handleMessage');
const registerUserHandlers = require('./handleUser')
const registerDisconnectionHandlers = require('./handleDisconnection')

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
  
  // registerMessageHandler(io, socket)
  socket.on('send-message', (message) => {
    console.log('>> send message');
    if (message.startsWith('/p')) {
      const usernameTarget = message.replace(/\/p \[(\w+)\].*/, '$1')
      const stripedMessage = message.replace(/\/p \[\w+\]/, '')
      const socketId = users[usernameTarget]
      if (socketId) {
        socket.to(socketId).emit('send-message', 
        `privately from ${socket.username}: ${stripedMessage}`)
      }
    } 
    else
      socket.broadcast.emit('send-message', `[${socket.username}]: ${message}`)
  })

  registerUserHandlers(io, socket)
  registerDisconnectionHandlers(io, socket, users)
})

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
})