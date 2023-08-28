const fs = require('fs')

exports.run = (client, message, argumenty) => {
  fs.writeFileSync('./database/bazaDanych.json', `{".":"eo"}`)
  message.channel.send(`ŚMIERĆ\nKUTAS\nZNISZCZENIE`)
}

exports.name = "zzusuń";
