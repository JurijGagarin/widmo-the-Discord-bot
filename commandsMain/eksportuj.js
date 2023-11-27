const { AttachmentBuilder } = require('discord.js')
const db = require('./../databaseMain/db.js')
const XLSX = require('xlsx');

exports.run = (client, message, argumenty) => {
  var hasła = []
  let trafienia = db.list(argumenty.join(' '))
  if(trafienia.length == 0){
    message.reply('wygląda na to, że ńe ma czego eksportować z Tgo sezonu')
    return
  }
  for(let i in trafienia){
    if(trafienia[i].endsWith('i') || trafienia[i].endsWith('t')) hasła.push(trafienia[i])
  }
  let OGkonkursy = db.mget(hasła)
  for(let j in OGkonkursy) OGkonkursy[j] = JSON.parse(OGkonkursy[j])

  let konkursy = OGkonkursy.flat()
  var listaID = [...new Set(konkursy.map(obj => obj.id))]
  if(typeof listaID[0] == 'undefined') listaID.shift()

  let obietniceZawodników = [];
  for (let l = 0; l < listaID.length; l++) {
    obietniceZawodników.push(client.users.fetch(listaID[l]));
  }
  Promise.all(obietniceZawodników).then(nicki => {
    var tab = []
    tab[0] = []
    tab[0][0] = 'ebe'
    for(let i = 0; i < hasła.length; i++) tab[0][i + 1] = hasła[i].slice(3)
    for(let i = 1; i < nicki.length + 1; i++){
      tab[i] = []
      tab[i][0] = nicki[i - 1].username
    }
    for(let q = 0; q < OGkonkursy.length; q++){
      for(let i = 0; i < OGkonkursy[q].length; i++){
        tab[listaID.indexOf(OGkonkursy[q][i].id) + 1][q + 1] = OGkonkursy[q][i].pozycja
      }
    }

    const workbook = XLSX.utils.book_new();
    const sheetName = 'Sheet1';
    const worksheet = XLSX.utils.aoa_to_sheet(tab);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'buffer' });
    const attachment = new AttachmentBuilder(excelBuffer, { name: `wykazPozycji${argumenty[0]}.xlsx`});
    message.channel.send({ files: [attachment] });
  })
}

exports.name = "eksportuj";