const fs = require('fs')

exports.run = (client, message, argumenty) => {
    let daneUżytkowników = JSON.parse(fs.readFileSync('./ballsDatabase/kulkiUżytkownikówDB.json'))
    let daneKulek = JSON.parse(fs.readFileSync('./ballsDatabase/listaKulekDB.json'))
    let znaleziono = false
    let [ping, ...nazwa] = argumenty
    nazwa = nazwa.join(' ')
    daneUżytkowników[message.author.id].forEach(element => {
        if((daneKulek[element].nazwa.toLowerCase() == nazwa || daneKulek[element].nazwaB.toLowerCase() == nazwa) && znaleziono == false){
            znaleziono = true
            var idBiorcy = ping.slice(2, ping.length - 1)
            if(typeof daneUżytkowników[idBiorcy] == 'undefined') daneUżytkowników[idBiorcy] = []
            daneUżytkowników[idBiorcy].push(element)
            let index = daneUżytkowników[message.author.id].indexOf(element)
            daneUżytkowników[message.author.id].splice(index, 1)
            fs.writeFileSync('./ballsDatabase/kulkiUżytkownikówDB.json', JSON.stringify(daneUżytkowników))
            message.reply(`Pomyślnie przekazano **${daneKulek[element].nazwa}** użytkownikowi ${ping}`)
        }
    })

    if(!znaleziono){
        message.reply(`nie masz tej karty w decku bratku`)
        return
    }
}

exports.name = "daj";