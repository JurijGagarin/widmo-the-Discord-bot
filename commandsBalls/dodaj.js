const { PermissionsBitField } = require('discord.js')
const fs = require('fs')

exports.run = (client, message, argumenty) => {
    if(!(message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id == '691720485343592469') || 
    !(message.guild.id == '1094901377731403866' || message.guild.id == '1144018556355350638' || message.guild.id == '916357080754040833')){
        message.channel.send("brak uprawnień")
        return
    }

    let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
    let prompt = argumenty.join(' ')
    let czudzysłowy = []
    for(let i = 0; i < prompt.length; i++){
        if(prompt[i] == '"') czudzysłowy.push(i)
    }
    if(czudzysłowy.length != 4){
        message.reply(`zła ilość cudzysłowów, przeczytaj dokładnie k!pomoc`)
        return
    }
    let resztaPromptu = prompt.slice(czudzysłowy[3]+2).split(' ')
    if(resztaPromptu.length != 4){
        message.reply(`zła liczba argumentów, przeczytaj dokładnie k!pomoc`)
        return
    }
    daneKulek.push({
        nazwa: prompt.slice(czudzysłowy[0] + 1, czudzysłowy[1]),
        nazwaB: prompt.slice(czudzysłowy[2] + 1, czudzysłowy[3]),
        emoji: '<:' + resztaPromptu[0],
        imgDrop: resztaPromptu[1],
        imgInfo: resztaPromptu[2],
        gwiazdki: +argumenty[3]
    })
    fs.writeFileSync('./databaseBalls/listaKulekDB.json', JSON.stringify(daneKulek))
    message.reply(`pomyślnie dodano kulkę`)
}

exports.name = "dodaj";