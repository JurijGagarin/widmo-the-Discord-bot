const db = require('../databaseMain/db.js')
const punktacja = require("./punktacja.js")

exports.run = (client, hasło, rok, dzień, seria, zawodnicy, zawodnicyJSON, channel) => {
  let imięPapieżaM = ''
  if(typeof client.imięPapieżaM == 'undefined') imięPapieżaM = 'Herr Podpułkownik'
  else imięPapieżaM = client.imięPapieżaM
  

  if(seria == 1){
    var hasła = []
    let trafienia = db.list(rok)
    for(let i in trafienia){
      if(trafienia[i].endsWith('i')) hasła.push(trafienia[i])
    }
  
    let konkursy = db.mget(hasła)
    for(let j in konkursy) konkursy[j] = JSON.parse(konkursy[j])
    konkursy = konkursy.flat()

    let suma = 0
    for(let i in konkursy) suma += konkursy[i].punkty
    suma = suma / 3
    client.HPbossa = suma
    channel.send(`Kości zostały rzucone. ${imięPapieżaM} wkracza do gry z liczbą ${suma} punktów życia`)

    db.set(hasło + ' ' + seria + ' t', zawodnicyJSON, channel)
  }
  else{
    var hasła = []
    hasła = db.list(rok + ' bf ' + dzień)  
    let OGkonkursy = db.mget(hasła)
    for(let j in OGkonkursy) OGkonkursy[j] = JSON.parse(OGkonkursy[j])
    let konkursy = OGkonkursy.flat()

    konkursy.forEach(el => {el.liczbaDSQ = 0})
    konkursy = Object.values(konkursy.reduce((acc, cur) => {
      if (cur) { 
        acc[cur.id] = acc[cur.id] || {...cur, punkty: 0}
        if(cur.pozycja == '-1') acc[cur.id].liczbaDSQ += 1
      }
      return acc
    }, {}))

    let dsq3 = konkursy.filter((e) => {return e.liczbaDSQ >= 3})

    let błędy = []
    for(let i = 0; i < zawodnicy.length; i++){
      for(let j = 0; j < dsq3.length; j++){
        if(zawodnicy[i].id == dsq3[j]?.id) {
          błędy.push(zawodnicy[i].id)
          zawodnicy.splice(i, 1) 
          i--;
          break;
        }
      }
    }
    let output = ``
    if(błędy.length == 0) output += `wszyscy startujący mieli uprawńŃa do startów`
    else{
      for(let j = 0; j < zawodnicy.length; j++){
        if(zawodnicy[j].pozycja == -1) break
        zawodnicy[j].punkty = punktacja.run("bf", '1', j+1)
        zawodnicy[j].pozycja = j + 1
      }

      output += `dokonano rewizji wyników`
      for(let i in błędy) output += `, <@${błędy[i]}>`
      output += ` ńe miLi uprawńŃ do startów`
    }
    channel.send(output)

    db.set(hasło + ' ' + seria + ' t', JSON.stringify(zawodnicy), channel)






    OGkonkursy[OGkonkursy.length] = zawodnicy
    konkursy = OGkonkursy.flat()

    let suma = 0
    for(let i in konkursy) suma += konkursy[i].punkty
    channel.send(`${imięPapieżaM} ma już tylko ${client.HPbossa - suma} z ${client.HPbossa} punktów życia`)

    konkursy.forEach(el => {el.liczbaDSQ = 0})
    konkursy = Object.values(konkursy.reduce((acc, cur) => {
      if (cur) { 
        acc[cur.id] = acc[cur.id] || {...cur, punkty: 0}
        if(cur.pozycja == '-1') acc[cur.id].liczbaDSQ += 1
      }
      return acc
    }, {}))

    dsq3 = konkursy.filter((e) => {return e.liczbaDSQ >= 3})
    let dsq2 = konkursy.filter((e) => {return e.liczbaDSQ == 2})


    let zmarli = []
    let zagrożeni = []
    
    for(let i = 0; i < zawodnicy.length; i++){
      for(let j = 0; j < dsq3.length; j++){
        if(zawodnicy[i].id == dsq3[j]?.id) {
          zmarli.push(zawodnicy[i].id)
          break;
        }
      }
      for(let j = 0; j < dsq2.length; j++){
        if(zawodnicy[i].id == dsq2[j]?.id) {
          zagrożeni.push(zawodnicy[i].id)
          break;
        }
      }
    }

    output = ``
    if(zmarli.length == 0) output += `Szczodrobliwy ${imięPapieżaM} oszczęDŹł nas Tj rundy i ńkogo ńe zabił`
    else{
      output += `${imięPapieżaM} w natarciu`
      for(let i in zmarli) output += `, <@${zmarli[i]}>`
      output += ` już z nami ńe ma`
    }
    channel.send(output)

    output = ``
    if(zagrożeni.length == 0) output += `Wszyscy pozostali w grze startujący mają zero DSQ na konće`
    else{
      output += `Hej`
      for(let i in zagrożeni) output += `, <@${zagrożeni[i]}>`
      output += `, uważajże, tylko jedno DSQ DŹli was od śmiRć`
    }
    channel.send(output)
  }
}