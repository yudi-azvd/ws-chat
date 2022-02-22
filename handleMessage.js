module.exports = (io, socket) => {
  const sendMessage = (message) => {
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
  }

  socket.on('send-message', sendMessage)
}