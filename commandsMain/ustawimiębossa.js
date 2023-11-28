exports.run = (client, message, argumenty) => {
  let argumentyBis = message.content.split(' ')
  argumentyBis.shift()
  client.imięPapieżaM = argumentyBis.join(' ')
  message.reply('Iμę zmieńono pomyślńe')
}

exports.name = "ustawimiębossa";