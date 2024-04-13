const db = require('../databaseMain/db.js')

exports.run = (hasło, zawodnicyJSON, seria, usunąć, channel) => {
  db.set(hasło + ' ' + seria + ' t', zawodnicyJSON, channel)

  let hasła = []
  for(let j = 1; j <= 2; j++){
    hasła.push(hasło + ' ' + j + ' t')
  }
  
  serie = db.mget(hasła)
  serie.unshift(0)
  serie[seria] = zawodnicyJSON

  for(let k = 1; k <= 2; k++){
    if(typeof serie[k] == 'undefined') serie[k] = null
    serie[k] = JSON.parse(serie[k])
  }

  
  if(serie[1] != null && serie[2] != null){
    serie[1] = serie[1].concat(serie[2]) 
    serie[1] = Object.values(serie[1].reduce((acc, cur) => {
      if (cur) { 
        acc[cur.id] = acc[cur.id] || {...cur, punkty: 0}
        acc[cur.id].punkty += cur.punkty
      }
      return acc
    }, {}))
    serie[1].sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);

    
    let drużynyIO = []
    let punktyID2 = {}
    drużynyIO[0] = {nazwa: 'Wpisać obiekt muszę bo się uduszę', punkty: -2137}
    for(let i = 0; i < serie[1].length; i++){
      let znaleziono = false
      for(let j = 0; j < drużynyIO.length; j++){
      	if(drużynyIO[j].nazwa == serie[1][i].kraj){
      		znaleziono = true
          if(drużynyIO[j].id2.length == 0){
            drużynyIO[j].punkty += serie[1][i].punkty
            drużynyIO[j].id2[0] = serie[1][i].id
            punktyID2[drużynyIO[j].nazwa] = serie[1][i].punkty
            drużynyIO[j].id2punkty = serie[1][i].punkty
          }
          else if(punktyID2[drużynyIO[j].nazwa] == serie[1][i].punkty){
            drużynyIO[j].id2.push(serie[1][i].id)
          }
      	}
      }
      if(znaleziono == false) drużynyIO.push({nazwa: serie[1][i].kraj, punkty: serie[1][i].punkty, id1: serie[1][i].id, id1punkty: serie[1][i].punkty, id2: []})
    }

    drużynyIO.shift()
    drużynyIO.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
    var drużynyJSON = JSON.stringify(drużynyIO)
    db.set(hasło + ' d', drużynyJSON, channel)
  }



  if(usunąć){
    db.del(hasło + ' ' + seria + ' t', channel)

    let j = 0
    if(serie[1] == null) j++
    if(serie[2] == null) j++

    if(j >= 1){
      db.del(hasło + ' d', channel)
    }
  }
};