const fs = require('fs')

exports.run = (client, message, argumenty) => {
  if(argumenty[0] == 'pc'){
    var link = './database/bazaDanych.json'
    fs.writeFileSync(link, `{".":"eo"}`)
  }
  else if(argumenty[0] == 'kk'){
    var link = './ballsDatabase/listaKulekDB.json'
    fs.writeFileSync(link, `[{"nazwa":"Pies w Zupie","nazwaB":"Psa w Zupie","emoji":"<:PieswZupie:1144018641688477826>","imgDrop":"https://i.imgur.com/EKtLZen.png","imgInfo":"https://i.imgur.com/d2Su2ER.png","gwiazdki":1}]`)
  }
  else if(argumenty[0] == 'ku'){
    var link = './ballsDatabase/kulkiUżytkownikówDB.json'
    fs.writeFileSync(link, `{"823522250459185173":[0]}`)
  }
  else{
    message.channel.send('podano zły argumenty[0] (pc, kk, ku)')
    return
  }

  
  message.channel.send(`ŚMIERĆ\nKUTAS\nZNISZCZENIE`)
}

exports.name = "zzusuń";
