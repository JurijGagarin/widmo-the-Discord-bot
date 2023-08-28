const db = require('./../database/db.js')

exports.run = (client, message, argumenty) => {
  if(argumenty.length != 3){
    message.channel.send('wygląda na to, że ńe ma odpowiedńej liczby argumNtów')
    return
  }

  var hasło = 'do zweryfikowania - - - - - '
  hasło += argumenty.join(' ')

  const getset = (rodzaj) => {
    value = db.get(hasło + ' ' + rodzaj)
    if(value != null && typeof value != 'undefined') {
      db.set(argumenty.join(' ') + ' ' + rodzaj, value)
      db.del(hasło + ' ' + rodzaj)
    }
  } 
  
  getset('i')
  getset('n')
  getset('t')
  getset('d')

  message.reply('konQrsy zwRyfikowano pomyślńe')
}

exports.name = "zweryfikuj";
