const fs = require('fs')

exports.run = (client, message, argumenty) => {
    let daneUżytkowników = JSON.parse(fs.readFileSync('./ballsDatabase/kulkiUżytkownikówDB.json'))
    let daneKulek = JSON.parse(fs.readFileSync('./ballsDatabase/listaKulekDB.json'))
    let znaleziono = false
    daneUżytkowników[message.author.id].forEach(element => {
        if(daneKulek[element].nazwa.toLowerCase() == argumenty.join(' ').toLowerCase() && znaleziono == false){
            znaleziono = true
            message.reply({
                files: [daneKulek[element].imgInfo]
            })
        }
    })

    if(!znaleziono){
        message.reply(`nie masz tej karty w decku bratku`)
        return
    }
}

exports.name = "info";