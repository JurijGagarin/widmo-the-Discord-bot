const fs = require('fs')

exports.run = (client, message, argumenty) => {
  if(argumenty[0] == 'pc') var link = './database/bazaDanych.json'
  else if(argumenty[0] == 'kk') var link = './ballsDatabase/listaKulekDB.json'
  else if(argumenty[0] == 'ku') var link = './ballsDatabase/kulkiUżytkownikówDB.json'
  else{
    message.channel.send('podano zły argumenty[0] (pc, kk, ku)')
    return
  }

  message.channel.send({ files: [link] })
};

exports.name = "zzweź";