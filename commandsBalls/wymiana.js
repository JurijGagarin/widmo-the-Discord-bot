const { EmbedBuilder } = require('discord.js');
const fs = require('fs')

let decki = []
decki[0] = []
decki[1] = []
let zgoda = []
zgoda[0] = false
zgoda[1] = false

const nadpiszDeck = (nr, embed) => {
  let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
  if(decki[nr].length == 0){
    embed.data.fields[nr].value = '*jeszcze tu jest pusto*'
  }
  else{
    output = ''
    for(let i in decki[nr]) output += daneKulek[decki[nr][i]].emoji + '- ' + daneKulek[decki[nr][i]].nazwaB + '\n'
    embed.data.fields[nr].value = output
  }
}

const nadpisz = (embed) => {
  nadpiszDeck(0, embed)
  nadpiszDeck(1, embed)
}

const daj = (nazwa, m, id1, nr) => {
  let daneUżytkowników = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
  let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
  let znaleziono = false
  daneUżytkowników[id1].forEach(element => {
    if((daneKulek[element].nazwa.toLowerCase() == nazwa || daneKulek[element].nazwaB.toLowerCase() == nazwa) && znaleziono == false){
      znaleziono = true
      decki[nr].push(element)
      let index = daneUżytkowników[id1].indexOf(element)
      daneUżytkowników[id1].splice(index, 1)
      fs.writeFileSync('./databaseBalls/kulkiUżytkownikówDB.json', JSON.stringify(daneUżytkowników))
    }
  })

  if(!znaleziono) m.reply(`nie masz tej karty w decku bratku`)
}

const usuń = (nazwa, m, id, nrdawcy) => {
  let daneUżytkowników = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
  let daneKulek = JSON.parse(fs.readFileSync('./databaseBalls/listaKulekDB.json'))
  let znaleziono = false

  for(let element = 0;  element < daneKulek.length; element++){
    if((daneKulek[element].nazwa.toLowerCase() == nazwa || daneKulek[element].nazwaB.toLowerCase() == nazwa) && znaleziono == false){
      znaleziono = true
      daneUżytkowników[id].push(element)
      let index = decki[nrdawcy].indexOf(element)
      decki[nrdawcy].splice(index, 1)
      fs.writeFileSync('./databaseBalls/kulkiUżytkownikówDB.json', JSON.stringify(daneUżytkowników))
    }
  }

  if(!znaleziono) m.reply(`nie masz tej karty w ofercie`)
}

const operacjaGeneralna = (msg, embed, m, id, nr, nr2) => {
  m.content = m.content.toLowerCase()
  if(m.content.startsWith('dodajże')){
    daj(m.content.split(' ').slice(1).join(' '), m, id, nr2)
    nadpisz(embed)
    msg.edit({ embeds: [embed] })
  }
  if(m.content.startsWith('usuńże') && !zgoda[nr]){
    usuń(m.content.split(' ').slice(1).join(' '), m, id, nr2)
    nadpisz(embed)
    msg.edit({ embeds: [embed] })
  }
  if(m.content.startsWith('usuńże') && zgoda[nr]){
    m.reply(`nie możesz zmieniać oferty po tym jak druga osoba ją zaakceptowała`)    
  }
  if(m.content.startsWith('akceptuję')){
    zgoda[nr2] = true
  }
  if(m.content.startsWith('cofnij akceptację')){
    zgoda[nr2] = false
  }
  if(m.content.startsWith('anuluj')) return true
  else return false
}

const anuluj = (msg, embed) => {
  embed.data.title = '🚫 Anulowana wymiana kulek'
  embed.data.fields[0].value = '~~' + embed.data.fields[0].value + '~~'
  embed.data.fields[1].value = '~~' + embed.data.fields[1].value + '~~'
  msg.edit({ embeds: [embed] })
}

const zatwierdź = (msg, id1, id2) => {
  let daneUżytkowników = JSON.parse(fs.readFileSync('./databaseBalls/kulkiUżytkownikówDB.json'))
  decki[0].forEach(el => {
    daneUżytkowników[id2].push(el)
  })
  decki[1].forEach(el => {
    daneUżytkowników[id1].push(el)
  })
  fs.writeFileSync('./databaseBalls/kulkiUżytkownikówDB.json', JSON.stringify(daneUżytkowników))
  msg.reply(`pomyślnie przeprowadzono wymianę`)
}

exports.run = (client, message, argumenty) => {
  if(client.trwającaWymiana){
    message.reply('obecnie trwa inna wymiana, zaczekaj aż się skończy')
    return
  }
  client.trwającaWymiana = true

  const [nickPingiętego] = message.mentions.users.values()
  const embed = new EmbedBuilder()
    .setColor(0xE64236)
    .setTitle('Wymiana kulek')
    .addFields(
      { name: message.author.globalName + ' oferuje', value: '*jeszcze tu jest pusto*' },
      { name: nickPingiętego.globalName + ' oferuje', value: '*jeszcze tu jest pusto*' },
    )
    .setFooter({ text: 'Wymiana zamknie się automatycznie po 2 minutach. Do tego czasu możesz używać komend dodajże [kulka], usuńże [kulka], akceptuję, anuluj' });

  message.reply({ embeds: [embed] }).then(msg => {
    const collector = message.channel.createMessageCollector({ time: 120000 });
    
    collector.on('collect', m => {
      let czyAnulować = false
      if(m.author.id == message.author.id) czyAnulować = czyAnulować || operacjaGeneralna(msg, embed, m, message.author.id, 1, 0)
      else if(m.author.id == nickPingiętego.id) czyAnulować = czyAnulować ||  operacjaGeneralna(msg, embed, m, nickPingiętego.id, 0, 1)

      if(czyAnulować){
        anuluj(msg, embed)
        client.trwającaWymiana = false
        return
      }

      if(zgoda[0] && zgoda[1]){
        zatwierdź(msg, message.author.id, nickPingiętego.id)
        client.trwającaWymiana = false
        return
      }
    })
    
    collector.on('end', collected => {
      msg.reply(`czas dobiegł końca, panel wymiany zostaje zamknięty`)
      client.trwającaWymiana = false
    });
  })
}

exports.name = "inicjujwymianę";