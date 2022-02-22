module.exports = (io, socket, users) => {
  const handleDisconnection = () => {
    io.emit('send-message', `${socket.username} HAS LEFT THE CHAT`)
    users.count--
  }

  socket.on('disconnect', handleDisconnection)
}