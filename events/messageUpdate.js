const messageCreate = require('./messageCreate.js')

module.exports = (client, oldMessage, newMessage) => {
  if(oldMessage.content != newMessage.content) messageCreate(client, newMessage)
}
