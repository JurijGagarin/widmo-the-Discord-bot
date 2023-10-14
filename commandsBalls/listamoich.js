const { EmbedBuilder } = require('discord.js');
const fs = require('fs')

exports.run = (client, message, argumenty) => {
    let daneUżytkowników = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
    let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))

    let uniq = [...new Set(daneUżytkowników[message.author.id])];
    let output = `Zdobyto ${uniq.length} z ${daneKulek.length}, czyli **${Math.round(uniq.length/daneKulek.length*100)}%**\n`
    daneUżytkowników[message.author.id].sort((a, b) => {return a.gwiazdki < b.gwiazdki})
    daneUżytkowników[message.author.id].forEach(kulkaDelikwenta => {
        output+= daneKulek[kulkaDelikwenta].emoji + '- ' + daneKulek[kulkaDelikwenta].nazwa + ' '
        for(let i = 0; i < daneKulek[kulkaDelikwenta].gwiazdki; i++) output += '⭐' 
        output += '\n'
    })

    let link = ''
    if(message.author.avatar !== null) link = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
    else link = `https://cdn.discordapp.com/embed/avatars/0.png`

    const exampleEmbed = new EmbedBuilder()
        .setColor(0xE64236)
        //.setTitle('Lista kulek')
        .setAuthor({ name: message.author.globalName, iconURL: link })
        .setDescription(output)

    message.reply({ embeds: [exampleEmbed] });
    //output != '' ? message.reply(output) : message.reply('nie złapałeś jeszcze żadnych kulek')
}

exports.name = "listaMoich";