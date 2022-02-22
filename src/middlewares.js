// Se essa função é usada como middleware, ela
// é chamada várias vezes. Não sei o motivo
const getUsername = (socket, next) => {
  console.log('>> middleware', new Date().getTime());
  const handshakeData = socket.request
  socket.username = handshakeData._query['username']
  users[socket.username] = socket.id
  next()
}

module.exports = {
  getUsername
}