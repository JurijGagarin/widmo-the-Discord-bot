const messageCreate = require('./messageCreate.js')

module.exports = (client, oldMessage, newMessage) => {
  messageCreate(client, newMessage)
}
