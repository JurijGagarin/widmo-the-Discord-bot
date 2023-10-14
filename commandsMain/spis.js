const db = require('./../databaseMain/db.js')

exports.run = (client, message, argumenty) => {
  if(argumenty[0] == 'dzw'){
    argumenty[0] = 'do zweryfikowania - - - - - '
  }
  else{
    argumenty.shift()
  }
  a = db.list(argumenty.join(' '))
  if(a.length == 0){
    message.channel.send("wyszukiwany zbiór jSt pusty jak gablotK puCHrów TotTnHmu")
  }
  else{
    var b = ''
    for(let j in a){
      b += a[j] +'\n'
      if(b.length > 1950 || j == a.length - 1){
        message.channel.send(b)
        b = ''
      }
    }
  }
}

exports.name = "spis";