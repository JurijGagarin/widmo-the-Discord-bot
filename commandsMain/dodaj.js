const db = require('../databaseMain/db.js')
const punktacja = require("../others/punktacja.js")
const tcp = require("../others/tcp.js")
const io = require("../others/io.js")
const vc = require("../others/vc.js")
const { PermissionsBitField, VoiceChannel } = require('discord.js');
const messageCreate = require('../events/messageCreate.js');
var listaKrajów = ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antarktyka', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Birma', 'Boliwia', 'Bonaire, Sint Eustatius i Saba', 'Holandia Karaibska', 'Bośnia i Hercegowina', 'Botswana', 'Brazylia', 'Brunei', 'Brytyjskie Terytorium Oceanu Indyjskiego', 'Brytyjskie Wyspy Dziewicze', 'Bułgaria', 'Burkina Faso', 'Burundi', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Eswatini', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Francuskie Terytoria Południowe i Antarktyczne', 'FTPiA', 'Gabon', 'Gambia', 'Georgia Południowa i Sandwich Południowy', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana Francuska', 'Gujana', 'Gwadelupa', 'Gwatemala', 'Gwinea Bissau', 'Gwinea Równikowa', 'Gwinea', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kosowo', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Łotwa', 'Macedonia Północna', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Malwiny', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Mołdawia', 'Monako', 'Mongolia', 'Montserrat', 'Mozambik', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Palestyna', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Środkowoafrykańska', 'Republika Zielonego Przylądka', 'Reunion', 'Rosja', 'RPA', 'Rumunia', 'Rwanda', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa Amerykańskie', 'Samoa', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Maarten', 'Słowacja', 'Słowenia', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Suazi', 'Sudan', 'Sudan Południowy', 'Surinam', 'Svalbard i Jan Mayen', 'Syria', 'Szwajcaria', 'Szwecja', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Węgry', 'Wielka Brytania', 'Wietnam', 'Włochy', 'Wybrzeże Kości Słoniowej', 'Wyspa Bouveta', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha', 'Wyspy Alandzkie', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Heard i McDonald', 'Wyspy Heard i McDonalda', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Wyspy Zielonego Przylądka', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Anglia', 'Walia', 'Szkocja', 'Irlandia Północna', 'Wyspa Świętej Heleny','Wyspa Wniebowstąpienia', 'Tristan da Cunha', 'Bougainville']


exports.run = (client, message, argumenty, usunąć) => {
  var [rok, typ, dzień, seria, ...wyniki] = argumenty
  wyniki = wyniki.join(" ").split(":dsq:")
  var małpyPrzed = 0;
  for(let litera in wyniki[0]) wyniki[0][litera] == "@" ? małpyPrzed++ : 0

  if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.author.id == '691720485343592469' && ['mś', 'mśwl', 'io', 'tcp', 'ps'].includes(typ)){
    message.channel.send('ńe masz uprawńŃ do dodawańa Tgo typu konQrsów')
    return
  }
  if(message.mentions.members.size == 0){
    message.channel.send('ńe wolno dodawać pustych konQrsów')
    return
  }

  let seriaN = +seria
  let bool4 = typ == 'mś' && seriaN > 4
  let bool3 = ['tcp', 'mśwl'].includes(typ) && seriaN > 3
  let bool2 = ['ps', 'io'].includes(typ) && seriaN > 2
  let bool1 = ['wt', 'k3', 'tdw', 'pt', 'wk', 'vc', 'mn', 'ind', 'druż', 'duety'].includes(typ) && seriaN > 1
  if(bool1 || bool2 || bool3 || bool4){
    message.channel.send('zbyt wysoki numR sRii')
    return
  }
  
  var zawodnicy = []
  var drużyny = []
  var drużynyVC = []
  drużyny[0] = {nazwa: 'Wpisać obiekt muszę bo się uduszę', punkty: -2137}
  var wzmiankiIDs = message.content.match(/<@!?(\d{17,19})>/g)
  
  for(let i = 0; i < message.mentions.members.size; i++){
    zawodnicy[i] = {
      id: wzmiankiIDs[i].slice(2, -1),
      punkty: punktacja.run(typ, seria, i+1),
      pozycja: i+1,
    }
    
    if(i >= małpyPrzed){
      zawodnicy[i].punkty = 0;
      zawodnicy[i].pozycja = -1;
    } 

    let rola = message.mentions.members.find(u => u.user.id == zawodnicy[i].id).roles.cache.find(r => {
      for(let j in listaKrajów){
        if(listaKrajów[j] == r.name){
          return r.name
    }}})
    zawodnicy[i].kraj = rola?.name || 'bezpaństwowiec'
    if(zawodnicy[i].kraj == 'bezpaństwowiec') message.channel.send(`${message.mentions.members.first(i+1)[i].user.username} ńe pośada roli państwa bądź ńe jSt ona na liśçe`)

  
    if(['ind', 'k3', 'wt', 'ps', 'wk', 'tdw', 'pt'].some(el => el == typ)){
      let znaleziono = false
      for(let j in drużyny){
      	if(drużyny[j].nazwa == zawodnicy[i].kraj){
      		znaleziono = true
          drużyny[j].punkty += zawodnicy[i].punkty
      	}
      }
      if(znaleziono == false) drużyny.push({nazwa: zawodnicy[i].kraj, punkty: zawodnicy[i].punkty})
    }

    if(typ == 'vc'){
      let znaleziono = false
      for(let j in drużynyVC){
      	if(drużynyVC[j].nazwa == zawodnicy[i].kraj){
      		znaleziono = true
          drużynyVC[j].punkty += zawodnicy[i].punkty
      	}
      }
      if(znaleziono == false) drużynyVC.push({nazwa: zawodnicy[i].kraj, punkty: zawodnicy[i].punkty})
    }

    if(['druż', 'duety', 'mś', 'mśwl', 'vc'].some(el => el == typ)){
      let znaleziono = false
      for(let j in drużyny){
      	if(drużyny[j].nazwa == zawodnicy[i].kraj){
          znaleziono = true
          if(typeof drużyny[j].id2 == 'undefined' || drużyny[j].id2 == null){
            drużyny[j].punkty += zawodnicy[i].punkty
            drużyny[j].id2 = zawodnicy[i].id
          }
      	}
      }
      if(znaleziono == false) drużyny.push({nazwa: zawodnicy[i].kraj, punkty: zawodnicy[i].punkty, id1: zawodnicy[i].id, id2: null})
    }
  }
  
  
  drużyny.shift()
  drużyny.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
  drużynyVC.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
  
  var zawodnicyJSON = JSON.stringify(zawodnicy)
  var drużynyJSON = JSON.stringify(drużyny)
  var hasło = ''
  var dzw = 'do zweryfikowania - - - - - '
  if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.author.id == '691720485343592469') hasło += dzw
  hasło += rok + ' ' + typ + ' ' + dzień
  
  
  if(['ind', 'k3', 'wt', 'wk', 'tdw', 'pt'].some(el => el == typ)){
    db.set(hasło + ' i', zawodnicyJSON, message.channel)
    db.set(hasło + ' n', drużynyJSON, message.channel)
  }
    
  if(typ == 'ps'){
    if(seria == 1) db.set(hasło  + ' 1 t', zawodnicyJSON, message.channel)
    else{
      db.set(hasło + ' i', zawodnicyJSON, message.channel)
      db.set(hasło + ' n', drużynyJSON, message.channel)
    }
  }

  if(typ == 'vc'){
    vc.run(hasło, drużyny, drużynyVC, zawodnicyJSON, message.channel)
  }

  if(typ == 'tcp'){
    tcp.run(hasło, seria, zawodnicyJSON, usunąć, message.channel)
  }

  if(typ == 'druż' || typ == 'duety'){
    db.set(hasło + ' d', drużynyJSON, message.channel)
    for(let j = 0; j < drużyny.length; j++){
      drużyny[j].punkty = punktacja.run(typ, 'x', j+1)
    }
    drużynyJSON = JSON.stringify(drużyny)
    db.set(hasło + ' n', drużynyJSON, message.channel)
  }

  if((typ == 'mś' || typ == 'mśwl') && dzień == 1){
    db.set(hasło + ' d', drużynyJSON, message.channel)
  }

  if(typ == 'io' && dzień == 1){
    io.run(hasło, zawodnicyJSON, seria, usunąć, message.channel)
  }

  if(((typ == 'mś' || typ == 'mśwl' || typ == 'io') && dzień != 1)){
    db.set(hasło + ' ' + seria + ' t', zawodnicyJSON, message.channel)
  }

  if(typ == 'mn'){
    db.set(hasło + ' ' + seria + ' t', zawodnicyJSON, message.channel)
  }
}

exports.name = "dodaj";