exports.run = (client, message, argumenty) => {
  if(client.imięPapieżaM) message.reply(client.imięPapieżaM)
  else message.reply('ńe ustawiono jeszcze iμŃa bossa')
}

exports.name = "wyślijimiębossa";