exports.run = (client, message, argumenty) => {
  if(client.imięPapieżaM) message.reply(client.imięPapieżaM)
  else message.reply('ńe ustawiono jeszcze iμeńa bossa')
}

exports.name = "wyślijimiębossa";