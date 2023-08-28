const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs')

exports.run = (client, message, argumenty) => {
    if(!(message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id == '691720485343592469') && 
    (message.guild.id == '1094901377731403866' || message.guild.id == '1144018556355350638' || message.guild.id == '916357080754040833')){
        message.channel.send("brak uprawnień")
        return
    }


    let dane = JSON.parse(fs.readFileSync('./ballsDatabase/listaKulekDB.json'))
    let output = ''
    dane.sort((a, b) => {return a.gwiazdki < b.gwiazdki})
    for(let el in dane){
        output += `${dane[el].emoji}- ${dane[el].nazwa} `
        for(let i = 0; i < dane[el].gwiazdki; i++) output += '⭐' 
        output += '\n'
    }
    const exampleEmbed = new EmbedBuilder()
        .setColor(0xE64236)
        .setTitle('Lista wszystkich kulek')
        .setDescription(output)

    message.reply({ embeds: [exampleEmbed] });
}

exports.name = "lista";