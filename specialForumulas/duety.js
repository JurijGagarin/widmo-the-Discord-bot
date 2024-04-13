const db = require('../databaseMain/db.js')

exports.run = (hasło, rok, zawodnicy, channel) => {
  var uprawnieni = db.get(rok)
  uprawnieni = JSON.parse(uprawnieni)

  let błędy = []
  for(let i = 0; i < zawodnicy.length; i++){
    let znaleziono = false
    for(let j = 0; j < uprawnieni.length; j++){
      if(zawodnicy[i].id == uprawnieni[j]?.id) {
        znaleziono = true
      }
    }
    if(znaleziono == false){
      błędy.push(zawodnicy[i].id)
      zawodnicy.splice(i, 1) 
      i--;
    }
  }
  let output = ``
  if(błędy.length == 0) output += `wszyscy startujący mieli uprawńŃa do startów`
  else{
    for(let j = 0; j < zawodnicy.length; j++){
      if(zawodnicy[j].pozycja == -1) break
      zawodnicy[j].punkty = punktacja.run("tcp'62", '2', j+1)
      zawodnicy[j].pozycja = j + 1
    }

    output += `dokonano rewizji wyników`
    for(let i in błędy) output += `, <@${błędy[i]}>`
    output += ` ńe miLi uprawńŃ do startów`
    db.set(hasło + ' 2 t', JSON.stringify(zawodnicy))
  }
  channel.send(output)
}