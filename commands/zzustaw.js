const fs = require('fs')

exports.run = (client, message, argumenty) => {
  fs.writeFileSync('./database/bazaDanych.json', argumenty.join())
  message.channel.send(`proces zakończony sukcesem`)
}

exports.name = "zzustaw";