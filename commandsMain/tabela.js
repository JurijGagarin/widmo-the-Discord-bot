const db = require('./../databaseMain/db.js')
const żywotWojtyły = require("./../others/żywotWojtyły.js")
const skokowa = require("./../others/skokowa.js")
var listaKrajów = ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antarktyka', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Birma', 'Boliwia', 'Bonaire, Sint Eustatius i Saba', 'Holandia Karaibska', 'Bośnia i Hercegowina', 'Botswana', 'Brazylia', 'Brunei', 'Brytyjskie Terytorium Oceanu Indyjskiego', 'Brytyjskie Wyspy Dziewicze', 'Bułgaria', 'Burkina Faso', 'Burundi', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Eswatini', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Francuskie Terytoria Południowe i Antarktyczne', 'FTPiA', 'Gabon', 'Gambia', 'Georgia Południowa i Sandwich Południowy', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana Francuska', 'Gujana', 'Gwadelupa', 'Gwatemala', 'Gwinea Bissau', 'Gwinea Równikowa', 'Gwinea', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kosowo', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Łotwa', 'Macedonia Północna', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Malwiny', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Mołdawia', 'Monako', 'Mongolia', 'Montserrat', 'Mozambik', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Palestyna', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Środkowoafrykańska', 'Republika Zielonego Przylądka', 'Reunion', 'Rosja', 'RPA', 'Rumunia', 'Rwanda', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa Amerykańskie', 'Samoa', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Maarten', 'Słowacja', 'Słowenia', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Suazi', 'Sudan', 'Sudan Południowy', 'Surinam', 'Svalbard i Jan Mayen', 'Syria', 'Szwajcaria', 'Szwecja', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Węgry', 'Wielka Brytania', 'Wietnam', 'Włochy', 'Wybrzeże Kości Słoniowej', 'Wyspa Bouveta', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha', 'Wyspy Alandzkie', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Heard i McDonald', 'Wyspy Heard i McDonalda', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Wyspy Zielonego Przylądka', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Anglia', 'Walia', 'Szkocja', 'Irlandia Północna', 'Wyspa Świętej Heleny','Wyspa Wniebowstąpienia', 'Tristan da Cunha', 'Bougainville']
var listaKodów2 = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AQ', 'AG', 'SA', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BY', 'MM', 'BO', 'BQ', 'BQ', 'BA', 'BW', 'BR', 'BN', 'IO', 'VG', 'BG', 'BF', 'BI', 'CL', 'CN', 'HR', 'CW', 'CY', 'TD', 'ME', 'CZ', 'UM', 'DK', 'CD', 'DM', 'DO', 'DJ', 'EG', 'EC', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FJ', 'PH', 'FI', 'FR', 'TF', 'TF', 'GA', 'GM', 'GS', 'GH', 'GI', 'GR', 'GD', 'GL', 'GE', 'GU', 'GG', 'GF', 'GY', 'GP', 'GT', 'GW', 'GQ', 'GN', 'HT', 'ES', 'NL', 'HN', 'HK', 'IN', 'ID', 'IQ', 'IR', 'IE', 'IS', 'IL', 'JM', 'JP', 'YE', 'JE', 'JO', 'KY', 'KH', 'CM', 'CA', 'QA', 'KZ', 'KE', 'KG', 'KI', 'CO', 'KM', 'CG', 'KR', 'KP', 'XK', 'CR', 'CU', 'KW', 'LA', 'LS', 'LB', 'LR', 'LY', 'LI', 'LT', 'LU', 'LV', 'MK', 'MG', 'YT', 'MO', 'MW', 'MV', 'MY', 'ML', 'MT', 'FK', 'MP', 'MA', 'MQ', 'MR', 'MU', 'MX', 'FM', 'MM', 'MD', 'MC', 'MN', 'MS', 'MZ', 'NA', 'NR', 'NP', 'DE', 'NE', 'NG', 'NI', 'NU', 'NF', 'NO', 'NC', 'NZ', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PN', 'PF', 'PL', 'PR', 'PT', 'ZA', 'CF', 'CV', 'RE', 'RU', 'ZA', 'RO', 'RW', 'EH', 'KN', 'LC', 'VC', 'BL', 'MF', 'PM', 'SV', 'AS', 'WS', 'SM', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SO', 'LK', 'US', 'SZ', 'SD', 'SS', 'SR', 'SJ', 'SY', 'CH', 'SE', 'TJ', 'TH', 'TW', 'TZ', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'UY', 'UZ', 'VU', 'WF', 'VA', 'VE', 'HU', 'GB', 'VN', 'IT', 'CI', 'BV', 'CX', 'IM', 'SH', 'AX', 'CK', 'VI', 'HM', 'HM', 'CC', 'MH', 'FO', 'SB', 'ST', 'CV', 'ZM', 'ZW', 'AE', 'GB-ENG', 'GB-WLS', 'GB-SCT', 'GB-NIR', 'SH', 'AC', 'TA', 'BU']



exports.run = (client, message, argumenty) => {
  var [protoParametr, rokS, protoTyp, dzień, seria] = argumenty

  protoParametr = protoParametr.split('-')
  var parametr = protoParametr[0]
  var isArch = (protoParametr[1] == 'arch')
  
  protoTyp = protoTyp.split('-')
  var typ = protoTyp[0] || ''
  var rodzaj = protoTyp[1] || ''
  if(!['i', 'd', 't', 'n', 'q', ''].some(el => el == rodzaj)){
    message.channel.send('uŻto złego rodzaju')
    return
  }
  if(rodzaj == ''){
    if(['ind', 'k3', 'wt', 'ps', 'tcp', 'pt', 'wk', 'vc', 'tdw', "k3'22"].some(el => el == typ)) rodzaj = 'i'
    if(typ == 'druż' || typ == 'duety') rodzaj = 'n'
    if(typ == "tcp'62" || typ == 'mn' || typ == 'gp' || typ == 'bf') rodzaj = 't'
    if((typ == 'io' || typ == 'mś' || typ == 'mśwl') && dzień == 1) rodzaj = 'd'
    if((typ == 'io' || typ == 'mś' || typ == 'mśwl') && dzień != 1) rodzaj = 't'
  }
  

  
  var hasło = `${rokS} ${typ}`
  if(dzień) hasło += ` ${dzień}`
  if(seria) hasło += ` ${seria}`
  if((typ == 'ind' || typ == 'druż') && !isArch) hasło = rokS

  var output = ''
  if(isArch) output += hasło + ` (${rodzaj})` + '\n'
  


  var hasła = []
  trafienia = db.list(hasło)
  for(let i in trafienia){
    var trafienia2 = trafienia[i].split(' ')
    if(trafienia2[3] == rodzaj || trafienia2[4] == rodzaj) hasła.push(trafienia[i])
  }



  konkursy = db.mget(hasła)
  for(let j in konkursy){
    konkursy[j] = JSON.parse(konkursy[j])
  }
  konkursy = konkursy.flat()
  


  if(rodzaj == 'q'){
    if(argumenty.length != 4){
      message.channel.send('zła liczba argumNtów')
      return
    }
    if(parametr == 'pingi'){
      for(let k = 0; k < konkursy.length; k++){
        if(konkursy[k]) output += `${konkursy[k].jakiAwans}. <@${konkursy[k].id}>\n`
      }
      output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
    }
    else{
      let obietniceZawodników = [];
      for (let l = 0; l < konkursy.length; l++) {
        obietniceZawodników.push(client.users.fetch(konkursy[l].id));
      }
      Promise.all(obietniceZawodników).then(nicki => {
        for(let q = 0; q < nicki.length; q++){
          output += `${konkursy[q].jakiAwans}. ${nicki[q].username}\n`
        }
        output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
      })
    }
  }



    
  else if(rodzaj == 'i' || rodzaj == 't'){
    konkursy = Object.values(konkursy.reduce((acc, cur) => {
      if (cur) { 
        acc[cur.id] = acc[cur.id] || {...cur, punkty: 0}
        acc[cur.id].punkty += cur.punkty
        acc[cur.id].kraj = cur.kraj
      }
      return acc
    }, {}))
    konkursy.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);


    if(parametr == 'pingi'){
      var nr = 1
      for(let k = 0; k < konkursy.length; k++){
        if(k > 0 && konkursy[k].punkty != konkursy[k-1].punkty) nr = k + 1
        output += `${nr}. <@${konkursy[k].id}> ${konkursy[k].punkty} pkt.\n`
      }
      output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
    }
    else{
      let obietniceZawodników = [];
      for (let l = 0; l < konkursy.length; l++) {
        obietniceZawodników.push(client.users.fetch(konkursy[l].id));
      }
      Promise.all(obietniceZawodników).then(nicki => {
        if(parametr == 'nicki'){
          var nr = 1
          for(let q = 0; q < nicki.length; q++){
            if(q > 0 && konkursy[q].punkty != konkursy[q-1].punkty) nr = q + 1
            output += `${nr}. ${nicki[q].username}—  ${konkursy[q].punkty} pkt.`
            if(isArch && konkursy[q].pozycja == -1) output += ' -<:DSQ:874279963841400833>'
            output += '\n'
          }
          output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
        }
        if(parametr == 's'){
          skokowa.run(konkursy, nicki, message.channel, rodzaj, typ)
        }
        if(parametr == 'żw'){
          żywotWojtyły.run(konkursy, nicki, message.channel, typ, rokS)      
        }
      })
    }
  }

    
  else{
    konkursy = Object.values(konkursy.reduce((acc, cur) => {
      if (cur) { 
        acc[cur.nazwa] = acc[cur.nazwa] || {...cur, punkty: 0}
        acc[cur.nazwa].punkty += cur.punkty
      }
      return acc
    }, {}))
    konkursy.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
    for(let k in konkursy){
      konkursy[k].kraj = konkursy[k].nazwa
      konkursy[k].username = konkursy[k].nazwa
    }

    
    if(parametr == 'pingi'|| parametr == 'nicki'){
      for(let n = 0; n < konkursy.length; n++){
        let znaleziono = false
        for(let m in listaKrajów){
          if(listaKrajów[m] == konkursy[n].kraj){
            if(listaKodów2[m] == 'BU')  konkursy[n].flaga = `<:flag_bu:1164228158254493767>`
            else if(!listaKodów2[m].startsWith('GB')) konkursy[n].flaga = `:flag_${listaKodów2[m].toLowerCase()}:`
            else if(listaKodów2[m] == 'GB-ENG')  konkursy[n].flaga = `:england:`
            else if(listaKodów2[m] == 'GB-WLS')  konkursy[n].flaga = `:wales:`
            else if(listaKodów2[m] == 'GB-SCT')  konkursy[n].flaga = `:scotland:`
            else if(listaKodów2[m] == 'GB-NIR')  konkursy[n].flaga = `<:northern_ireland:1044938698216702013>`
            znaleziono = true
            break
          }
        }
        if(!znaleziono) konkursy[n].flaga = ':united_nations:'
      }
    }


    if((parametr == 'pingi'|| parametr == 'nicki') && rodzaj == 'n'){
      var nr = 1
      for(let q = 0; q < konkursy.length; q++){
        if(q > 0 && konkursy[q].punkty != konkursy[q-1].punkty) nr = q + 1
        output += `${nr}. ${konkursy[q].flaga} ${konkursy[q].username}—  ${konkursy[q].punkty} pkt.\n`
      }
      output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
    }
    else if(parametr == 'pingi' && rodzaj == 'd'){
      var nr = 1
      for(let q = 0; q < konkursy.length; q++){
        if(q > 0 && konkursy[q].punkty != konkursy[q-1].punkty) nr = q + 1
        output += `${nr}. ${konkursy[q].flaga} ${konkursy[q].username}—  ${konkursy[q].punkty} pkt. `
        if(q < 3){ 
          output += `(<@${konkursy[q].id1}>`;
          if(typ == 'io'){
            output += `: ${konkursy[q].id1punkty}`
            for(let ii = 0; ii < konkursy[q].id2.length; ii++){
              output += `, <@${konkursy[q].id2[ii]}>: ${konkursy[q].id2punkty}`;
            }
          } 
          else if(konkursy[q].id2) output += ` i <@${konkursy[q].id2}>`;
          output += `)`
        }
        output += '\n'
      }
      output != '' ? message.reply(output) : message.reply('tabLa jSt pusta')           
    }
    else if(parametr == 'nicki' && rodzaj == 'd'){
      let obietniceZawodników = [];
      for (let l = 0; l < konkursy.length; l++) {
        if(l >= 3) break
        obietniceZawodników.push(client.users.fetch(konkursy[l].id1));
        if(konkursy[l].id2) obietniceZawodników.push(client.users.fetch(konkursy[l].id2));
        else obietniceZawodników.push(client.users.fetch(konkursy[l].id1));
      }
      Promise.all(obietniceZawodników).then(nicki => {
        var nr = 1
        for(let q = 0; q < konkursy.length; q++){
          if(q > 0 && konkursy[q].punkty != konkursy[q-1].punkty) nr = q + 1
          output += `${nr}. ${konkursy[q].flaga} ${konkursy[q].username}—  ${konkursy[q].punkty} pkt. `
          if(q < 3) output += `(${nicki[2 * q].username}`
          if(q < 3 && konkursy[q].id2) output += ` i ${nicki[2 * q + 1].username}`
          if(q < 3) output += `)`
          output += '\n'
        }
        output != '' ? message.reply(output) : message.reply('tabLa jSt pusta') 
      })          
    }
    else if(parametr == 's'){
      skokowa.run(konkursy, konkursy, message.channel, rodzaj, typ)
    }
    else if(parametr == 'żw'){
      message.channel.send('tN wzór ńe wspiRa taBl drużynowych')
      return  
    }
  }
}

exports.name = "tabela";
