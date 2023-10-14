const fs = require('fs')
const { PermissionsBitField } = require('discord.js');

exports.run = (client, message, argumenty) => {
    if(!(message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id == '691720485343592469') || 
    !(message.guild.id == '1094901377731403866' || message.guild.id == '1144018556355350638' || message.guild.id == '916357080754040833')){
        message.channel.send("brak uprawnień")
        return
    }

    let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
    let daneUżytkowników = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
    let znaleziono = false
    for(let element = 0; element < daneKulek.length; element++){
        if(daneKulek[element].nazwa.toLowerCase() == argumenty.join(' ').toLowerCase() && !znaleziono){
            znaleziono = true
            daneKulek.splice(element, 1)

            for(let el in daneUżytkowników){
                daneUżytkowników[el] = daneUżytkowników[el].filter((ele) => {return ele != element})
            }
            
        }
    }
    fs.writeFileSync('./databaseBalls/listaKulekDB.json', JSON.stringify(daneKulek))
    fs.writeFileSync('./databaseBalls/kulkiUżytkownikówDB.json', JSON.stringify(daneUżytkowników))

    if(!znaleziono){
        message.reply(`nie znaleziono takiej kulki w systemie`)
        return
    }
}

exports.name = "usuń";