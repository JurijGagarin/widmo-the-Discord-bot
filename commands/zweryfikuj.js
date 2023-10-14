const db = require('./../database/db.js')

exports.run = (client, message, argumenty) => {
  if(argumenty.length != 3){
    message.channel.send('wygląda na to, że ńe ma odpowiedńej liczby argumNtów')
    return
  }

  var hasło = 'do zweryfikowania - - - - - '
  var neuhasło = argumenty.join(' ')
  hasło += neuhasło

  var lista = db.list(hasło)
  if(lista.length == 0){
    message.channel.send('ńe ma czego wRyfikować')
    return
  }
  for(let i = 0; i < lista.length; i++){
    let value = db.get(lista[i])
    if(value != null && typeof value != 'undefined') {
      let hasłoEl = neuhasło + lista[i].slice(hasło.length)
      db.set(hasłoEl, value)
      db.del(lista[i])
    }
  }
/*
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
*/
  message.reply('konQrsy zwRyfikowano pomyślńe')
}

exports.name = "zweryfikuj";
