const db = require('./../databaseMain/db.js')

exports.run = (client, message, argumenty) => {
  var [parametr, rokS] = argumenty
  
  var hasła = []
  trafienia = db.list(rokS)
  if(trafienia.length == 0){
    message.channel.send("ńe ma dodanych konQrsów z Tgo roQ")
    return
  }

  for(let i in trafienia){
    let trafienia2 = trafienia[i].split(' ')
    let if1 = trafienia[i].endsWith('i')
    let if2 = trafienia2[1] == "tcp'62" || trafienia2[1] == 'ps'
    let if3 = trafienia[i].endsWith('ps 1 t') || (trafienia2[1] == "tcp'62" && (trafienia2[3] == '1' || trafienia2[3] == '2'))
    let if4 = if2 && trafienia[i].endsWith('i')
    let c1 = parametr == 'dsq'
    let c2 = parametr == 'p1' || parametr == 'top3'
    if(if1 && !if2) hasła.push(trafienia[i])
    if(c1 && if3) hasła.push(trafienia[i])
    if(c2 && if4) hasła.push(trafienia[i])
  }
  
  if(hasła.length == 0){
    message.channel.send("ńe ma dodanych konQrsów z których możnaby zrobić podaną statystykę")
    return
  }
  


  konkursy = db.mget(hasła)
  for(let j in konkursy){
    konkursy[j] = JSON.parse(konkursy[j])
  }
  konkursy = konkursy.flat()

  var szukanePozycje = []
  if(parametr == 'p1') szukanePozycje = [1]
  if(parametr == 'top3') szukanePozycje = [1, 2, 3]
  if(parametr == 'dsq') szukanePozycje = [-1]

  
  konkursy = Object.values(konkursy.reduce((acc, cur) => {
    if (cur) { 
      acc[cur.id] = acc[cur.id] || {...cur, wystąpienia: 0}
      if(szukanePozycje.includes(cur.pozycja)) acc[cur.id].wystąpienia++
    }
    return acc
  }, {}))
  
  konkursy.sort((a, b) => (a.wystąpienia < b.wystąpienia) ? 1 : -1);
  konkursy = konkursy.filter(i => i.wystąpienia != 0)

  let obietniceZawodników = [];
  for (let l = 0; l < konkursy.length; l++) {
    obietniceZawodników.push(client.users.fetch(konkursy[l].id));
  }
  Promise.all(obietniceZawodników).then(nicki => {
    var output = ''
    var nr = 1
    for(let q = 0; q < nicki.length; q++){
      if(q > 0 && konkursy[q].wystąpienia != konkursy[q-1].wystąpienia) nr = q + 1
      output += `${nr}. ${nicki[q].username}—  ${konkursy[q].wystąpienia}\n`
    }
    output == '' ? 'trochę tu pusto' : 0
    message.reply(output)
  })
}

exports.name = "spis";