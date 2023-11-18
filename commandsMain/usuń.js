const db = require('./../databaseMain/db.js')
const dodaj = require('./dodaj.js')

exports.run = (client, message, argumenty) => {
  if(argumenty[0] == 'dzw'){
    argumenty[0] = 'do zweryfikowania - - - - - '
  }
  else{
    argumenty.shift()
  }

  let if1 = ['ind', 'k3', 'wt', 'tcp', 'pt', 'wk', 'vc', 'tdw', 'druż', 'duety', 'gp', "k3'22"].includes(argumenty[1])
  let if2 = (argumenty[1] == 'mś' || argumenty[1] == 'mśwl') && argumenty[2] == '1'
  if(if1 || if2){
    argumenty.pop()
    db.del(argumenty.join(' ') + ' i', message.channel)
    db.del(argumenty.join(' ') + ' 1 t', message.channel)
    db.del(argumenty.join(' ') + ' d', message.channel)
    db.del(argumenty.join(' ') + ' n', message.channel)
  }
  
  if(['io', 'mś', 'mśwl'].includes(argumenty[1]) && argumenty[2] != '1'){
    db.del(argumenty.join(' ') + ' t', message.channel)
  }

  if(['mn', 'bf'].includes(argumenty[1])){
    db.del(argumenty.join(' ') + ' t', message.channel)
  }
  
  if(argumenty[1] == 'ps' && argumenty[3] == '1'){
    argumenty.pop()
    db.del(argumenty.join(' ') + ' t', message.channel)
  }
  
  if(argumenty[1] == 'ps' && argumenty[3] == '2'){
    argumenty.pop()
    db.del(argumenty.join(' ') + ' i', message.channel)
    db.del(argumenty.join(' ') + ' n', message.channel)
  }
  
  if(argumenty[1] == "tcp'62-t"){
    db.del(argumenty.join(' ') + ' t', message.channel)
    let seria = argumenty.pop()
    if(seria == '2' || seria == '3'){
      db.del(argumenty.join(' ') + ' n', message.channel)
      db.del(argumenty.join(' ') + ' i', message.channel)
    }
    if(seria == '1' || seria == '2'){
      db.del(argumenty.join(' ') + ' q', message.channel)
    }
  }
  
  if(argumenty[1] == "tcp'62-i"){
    argumenty.pop()
    a = db.list(argumenty.join(' '))
    for(let j in a){
      db.del(a[j], message.channel)
    }
  }

  if(argumenty[1] == 'io' && argumenty[2] == '1'){
    db.del(argumenty.join(' ') + ' t', message.channel)
    argumenty.pop()
    db.del(argumenty.join(' ') + ' d', message.channel)
  }
}

exports.name = "usuń";
