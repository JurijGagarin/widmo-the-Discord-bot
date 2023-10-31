const db = require('../databaseMain/db.js')
const punktacja = require("./punktacja.js")

exports.run = (hasło, seria, zawodnicyJSON, usunąć, channel) => {
  db.set(hasło + ' ' + seria + ' t', zawodnicyJSON, channel)

  let hasła = []
  for(let j = 1; j <= 3; j++){
    hasła.push(hasło + ' ' + j + ' t')
  }
  hasła.push(hasło + ' q')
  
  serie = db.mget(hasła)
  serie.unshift(0)
  serie[seria] = zawodnicyJSON

  for(let k = 1; k <= 4; k++){
    if(typeof serie[k] == 'undefined') serie[k] = null
    serie[k] = JSON.parse(serie[k])
  }


  if(serie[1] != null && serie[2] != null && seria < 3){
    let błędy = []
    for(let i = 0; i < serie[2].length; i++){
      let znaleziono = false
      for(let j = 0; j < 16; j++){
        if(serie[2][i].id == serie[1][j]?.id) {
          znaleziono = true
        }
      }
      if(znaleziono == false){
        błędy.push(serie[2][i].id)
        serie[2].splice(i, 1) 
        i--;
      }
    }
    let output = ``
    if(błędy.length == 0) output += `wszyscy startujący mieli uprawńŃa do startów`
    else{
      for(let j = 0; j < serie[2].length; j++){
        if(serie[2][j].pozycja == -1) break
        serie[2][j].punkty = punktacja.run("tcp'62", '2', j+1)
        serie[2][j].pozycja = j + 1
      }

      output += `dokonano rewizji wyników`
      for(let i in błędy) output += `, <@${błędy[i]}>`
      output += ` ńe miLi uprawńŃ do startów`
      db.set(hasło + ' 2 t', JSON.stringify(serie[2]))
    }
    channel.send(output)



    serie[1].forEach(obj => {
      obj.pozycja2 = serie[2].filter(obj2 => obj.id == obj2.id)[0]?.pozycja || 0
    })

    let zakwalifikowani = []
    let luckyLoosers = []
    for(let n = 0; n < 8; n++){
      if(typeof serie[1][n] == 'undefined'){
        break
      }
      else if(typeof serie[1][15 - n] == 'undefined'){
        if(serie[1][n].pozycja2 != -1) zakwalifikowani.push(serie[1][n])
      }
      else if(serie[1][n].pozycja2 > 0 && serie[1][15 - n].pozycja2 > 0){
        if(serie[1][n].pozycja2 < serie[1][15 - n].pozycja2){
          zakwalifikowani.push(serie[1][n])
          luckyLoosers.push(serie[1][15 - n])
        }
        else{
          zakwalifikowani.push(serie[1][15 - n])
          luckyLoosers.push(serie[1][n])
        }
      }
      else if(serie[1][n].pozycja2 > 0){
        zakwalifikowani.push(serie[1][n])
      }
      else if(serie[1][15 - n].pozycja2 > 0){
        zakwalifikowani.push(serie[1][15 - n])
      }
    }

    luckyLoosers.sort((a, b) => (a.pozycja2 > b.pozycja2) ? 1 : -1);
    for(let i in zakwalifikowani) zakwalifikowani[i].jakiAwans = 'A'
    for(let i in luckyLoosers) luckyLoosers[i].jakiAwans = 'LL'
    zakwalifikowani.push(luckyLoosers.shift())
    zakwalifikowani.push(luckyLoosers.shift())
    db.set(hasło + ' q', JSON.stringify(zakwalifikowani), channel)
  }


  else if(serie[1] != null && serie[2] != null && serie[3] != null){
    let błędy = []
    for(let i = 0; i < serie[3].length; i++){
      let znaleziono = false
      for(let j = 0; j < serie[4].length; j++){
        if(serie[3][i].id == serie[4][j]?.id) {
          znaleziono = true
        }
      }
      if(znaleziono == false){
        błędy.push(serie[3][i].id)
        serie[3].splice(i, 1) 
        i--;
      }
    }
    let output = ``
    if(błędy.length == 0) output += `wszyscy startujący mieli uprawńŃa do startów`
    else{
      for(let j = 0; j < serie[3].length; j++){
        if(serie[3][j].pozycja == -1) break
        serie[3][j].punkty = punktacja.run("tcp'62", '2', j+1)
        serie[3][j].pozycja = j + 1
      }

      output += `dokonano rewizji wyników`
      for(let i in błędy) output += `, <@${błędy[i]}>`
      output += ` ńe miLi uprawńŃ do startów`
      db.set(hasło + ' 3 t', JSON.stringify(serie[3]))
    }
    channel.send(output)



    serie[2] = serie[2].concat(serie[3]) 
    serie[2] = Object.values(serie[2].reduce((acc, cur) => {
      if (cur) { 
        acc[cur.id] = acc[cur.id] || {...cur, punkty: 0}
        acc[cur.id].punkty += cur.punkty
      }
      return acc
    }, {}))

    serie[2].sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);

    let znalezieni = []
    let nieznalezieni = []
    for(let i = 0; i < serie[2].length; i++){
      let znaleziono = false
      for(let j = 0; j < serie[4].length; j++){
        if(serie[2][i].id == serie[4][j]?.id){
          znalezieni.push(serie[2][i])
          console.log(i, j)
          znaleziono = true
        }
      }
      if(znaleziono == false){
        nieznalezieni.push(serie[2][i])
        console.log(i)
        serie[2].splice(i, 1) 
        i--;
      }
    }

    output = '' /*`wyniki ${hasło}\n`*/
    var nr = 1
    for(let k = 0; k < znalezieni.length; k++){
      if(k > 0 && znalezieni[k].punkty != znalezieni[k-1].punkty) nr = k + 1
      output += `${nr}. <@${znalezieni[k].id}> ${znalezieni[k].punkty} pkt.\n`
    }
    output += `\n`
    let nrb = nr
    for(let k = 0; k < nieznalezieni.length; k++){
      if(k > 0 && nieznalezieni[k].punkty != nieznalezieni[k-1].punkty) nr = nrb + k + 1
      if(nieznalezieni[k].pozycja == -1 && nieznalezieni[k - 1].pozycja != -1) output += `:dsq: `
      if(nieznalezieni[k].pozycja != -1) output += `${nr}. <@${nieznalezieni[k].id}> ${nieznalezieni[k].punkty} pkt.\n`
      else output += `<@${nieznalezieni[k].id}> `
    }
    output != '' ? channel.send(output) : channel.send('tabLa jSt pusta')
    


    for(let j = 0; j < serie[2].length; j++){
      serie[2][j].punkty = punktacja.run("tcp'62", '4', j+1)
      serie[2][j].pozycja = j + 1
    }

    db.set(hasło + ' i', JSON.stringify(serie[2]), channel)



    let drużynyTCP = []
    drużynyTCP[0] = {nazwa: 'Wpisać obiekt muszę bo się uduszę', punkty: -2137}
    for(let i in serie[2]){
      let znaleziono = false
      for(let j in drużynyTCP){
        if(drużynyTCP[j].nazwa == serie[2][i].kraj){
          znaleziono = true
          drużynyTCP[j].punkty += serie[2][i].punkty
        }
      }
      if(znaleziono == false) drużynyTCP.push({nazwa: serie[2][i].kraj, punkty: serie[2][i].punkty})
    }
    drużynyTCP.shift()
    drużynyTCP.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
    var drużynyJSON = JSON.stringify(drużynyTCP)
    db.set(hasło + ' n', drużynyJSON, channel)
  }



  if(usunąć){
    db.del(hasło + ' ' + seria + ' t', channel)

    let j = 0
    if(serie[1] == null) j++
    if(serie[2] == null) j++
    if(serie[3] == null) j++

    if(j >= 2){
      db.del(hasło + ' i', channel)
      db.del(hasło + ' n', channel)
    }
  }
};