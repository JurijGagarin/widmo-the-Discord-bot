const fs = require('fs')

exports.run = (client, message, argumenty) => {
  if(argumenty[0] == 'pc') var link = './database/bazaDanych.json'
  else if(argumenty[0] == 'kk') var link = './ballsDatabase/listaKulekDB.json'
  else if(argumenty[0] == 'ku') var link = './ballsDatabase/kulkiUżytkownikówDB.json'
  else{
    message.channel.send('podano zły argumenty[0] (pc, kk, ku)')
    return
  }

  const file = message.attachments.first()?.url;
  if (!file) return

  try {
    fetch(file).then(response => {
      if (!response.ok)
        return message.channel.send(
          'Wystąpił błąd:',
          response.statusText,
        );

      response.text().then(text => {
        if (text) {
          fs.writeFileSync(link, text)
          message.channel.send(`proces zakończony sukcesem`)
        }
      })
    })
  } catch (error) {
    console.log(error);
  }

}

exports.name = "zzustaw";