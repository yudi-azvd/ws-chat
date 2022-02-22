module.exports = (io, socket) => {
  const handleUserIsTyping = () => {
    socket.broadcast.emit('user-is-typing', socket.username)
  }
  
  const handleUserStoppedTyping = () => {
    socket.broadcast.emit('user-stopped-typing', socket.username)
  }

  socket.on('user-is-typing', handleUserIsTyping)
  socket.on('user-stopped-typing', handleUserStoppedTyping)
}