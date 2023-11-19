exports.run = (client, message, argumenty) => {
  client.imięPapieżaM = argumenty.join(' ')
  message.reply('Iμę zmieńono pomyślńe')
}

exports.name = "ustawimiębossa";