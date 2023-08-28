const fs = require('fs')
var link = './ballsDatabase/kulkiUżytkownikówDB.json'
var linkK = './ballsDatabase/listaKulekDB.json'



exports.set = (key, value) => {
    let dane = JSON.parse(fs.readFileSync(link))
    if(typeof dane[key] == 'undefined') dane[key] = []
    dane[key].push(value)
    fs.writeFileSync(link, JSON.stringify(dane))
}
  
/*exports.del = (key, nazwa) => {
    let dane = JSON.parse(fs.readFileSync(link))
    if(typeof dane[key] != 'undefined'){
        for(let i = 0; i < dane[key].lenght; i++){
            if(dane[key][i] == nazwa){
                dane[key].splice(i, 1)
                break
            }
        }
    }
    fs.writeFileSync(link, JSON.stringify(dane))
}*/