const express = require("express");
const http = require('http')

const app = express()
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

io.use((socket, next) => {
  const handshakeData = socket.request
  socket.username = handshakeData._query['username']
  next()
})

const users = {}

io.on('connection', (socket) => {
  console.log(`${socket.username} HAS ENTERED THE CHAT`)
  socket.broadcast.emit('send-message', `${socket.username} HAS ENTERED THE CHAT`)
  
  users[socket.username] = socket.id
  
  socket.on('send-message', (message) => {
    if (message.startsWith('/p')) {
      const usernameTarget = message.replace(/\/p \[(\w+)\].*/, '$1')
      const stripedMessage = message.replace(/\/p \[\w+\]/, '')
      const socketId = users[usernameTarget]
      if (socketId) {
        socket.to(socketId).emit('send-message', `privately from ${socket.username}: ${stripedMessage}`)
      }
    } 
    else
      socket.broadcast.emit('send-message', `[${socket.username}]: ${message}`)
  })

  socket.on('user-is-typing', () => {
    console.log('user is typing:', socket.username);
    socket.broadcast.emit('user-is-typing', socket.username)
  })

  socket.on('user-stopped-typing', () => {
    socket.broadcast.emit('user-stopped-typing', socket.username)
  })

  socket.on('disconnect', () => {
    io.emit('send-message', `${socket.username} HAS LEFT THE CHAT`)
  })
})

server.listen(3000, () => {
  console.log('listening on 3000');
})