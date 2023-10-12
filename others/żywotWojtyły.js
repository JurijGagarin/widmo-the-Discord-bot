const { AttachmentBuilder, CommandInteractionOptionResolver } = require('discord.js')
const Canvas = require('canvas');
const messageCreate = require('../events/messageCreate');
Canvas.registerFont('./photos/LilitaOne-Regular.ttf', { family: 'LilitaOne' });
var listaKrajów = ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antarktyka', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Birma', 'Boliwia', 'Bonaire, Sint Eustatius i Saba', 'Holandia Karaibska', 'Bośnia i Hercegowina', 'Botswana', 'Brazylia', 'Brunei', 'Brytyjskie Terytorium Oceanu Indyjskiego', 'Brytyjskie Wyspy Dziewicze', 'Bułgaria', 'Burkina Faso', 'Burundi', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Eswatini', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Francuskie Terytoria Południowe i Antarktyczne', 'FTPiA', 'Gabon', 'Gambia', 'Georgia Południowa i Sandwich Południowy', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana Francuska', 'Gujana', 'Gwadelupa', 'Gwatemala', 'Gwinea Bissau', 'Gwinea Równikowa', 'Gwinea', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kosowo', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Łotwa', 'Macedonia Północna', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Malwiny', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Mołdawia', 'Monako', 'Mongolia', 'Montserrat', 'Mozambik', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Palestyna', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Środkowoafrykańska', 'Republika Zielonego Przylądka', 'Reunion', 'Rosja', 'RPA', 'Rumunia', 'Rwanda', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa Amerykańskie', 'Samoa', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Maarten', 'Słowacja', 'Słowenia', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Suazi', 'Sudan', 'Sudan Południowy', 'Surinam', 'Svalbard i Jan Mayen', 'Syria', 'Szwajcaria', 'Szwecja', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Węgry', 'Wielka Brytania', 'Wietnam', 'Włochy', 'Wybrzeże Kości Słoniowej', 'Wyspa Bouveta', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha', 'Wyspy Alandzkie', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Heard i McDonald', 'Wyspy Heard i McDonalda', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Wyspy Zielonego Przylądka', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Anglia', 'Walia', 'Szkocja', 'Irlandia Północna', 'Wyspa Świętej Heleny','Wyspa Wniebowstąpienia', 'Tristan da Cunha']
var listaKodów2 = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AQ', 'AG', 'SA', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BY', 'MM', 'BO', 'BQ', 'BQ', 'BA', 'BW', 'BR', 'BN', 'IO', 'VG', 'BG', 'BF', 'BI', 'CL', 'CN', 'HR', 'CW', 'CY', 'TD', 'ME', 'CZ', 'UM', 'DK', 'CD', 'DM', 'DO', 'DJ', 'EG', 'EC', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FJ', 'PH', 'FI', 'FR', 'TF', 'TF', 'GA', 'GM', 'GS', 'GH', 'GI', 'GR', 'GD', 'GL', 'GE', 'GU', 'GG', 'GF', 'GY', 'GP', 'GT', 'GW', 'GQ', 'GN', 'HT', 'ES', 'NL', 'HN', 'HK', 'IN', 'ID', 'IQ', 'IR', 'IE', 'IS', 'IL', 'JM', 'JP', 'YE', 'JE', 'JO', 'KY', 'KH', 'CM', 'CA', 'QA', 'KZ', 'KE', 'KG', 'KI', 'CO', 'KM', 'CG', 'KR', 'KP', 'XK', 'CR', 'CU', 'KW', 'LA', 'LS', 'LB', 'LR', 'LY', 'LI', 'LT', 'LU', 'LV', 'MK', 'MG', 'YT', 'MO', 'MW', 'MV', 'MY', 'ML', 'MT', 'FK', 'MP', 'MA', 'MQ', 'MR', 'MU', 'MX', 'FM', 'MM', 'MD', 'MC', 'MN', 'MS', 'MZ', 'NA', 'NR', 'NP', 'DE', 'NE', 'NG', 'NI', 'NU', 'NF', 'NO', 'NC', 'NZ', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PN', 'PF', 'PL', 'PR', 'PT', 'ZA', 'CF', 'CV', 'RE', 'RU', 'ZA', 'RO', 'RW', 'EH', 'KN', 'LC', 'VC', 'BL', 'MF', 'PM', 'SV', 'AS', 'WS', 'SM', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SO', 'LK', 'US', 'SZ', 'SD', 'SS', 'SR', 'SJ', 'SY', 'CH', 'SE', 'TJ', 'TH', 'TW', 'TZ', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'UY', 'UZ', 'VU', 'WF', 'VA', 'VE', 'HU', 'GB', 'VN', 'IT', 'CI', 'BV', 'CX', 'IM', 'SH', 'AX', 'CK', 'VI', 'HM', 'HM', 'CC', 'MH', 'FO', 'SB', 'ST', 'CV', 'ZM', 'ZW', 'AE', 'GB-ENG', 'GB-WLS', 'GB-SCT', 'GB-NIR', 'SH', 'AC', 'TA']
var staliNicki = ['Primoz', 'worldshowoff', 'goha', 'hubibibi', 'Vlad', 'rawairek', 'Olos', 'matius', 'araxe', 'Mareque', 'de_presja', 'Kubys', 'gamex', 'Tajkos', 'Doguss', 'Olaga', 'Misiek', 'Janszy', 'KPç', 'Bart', 'Mar', 'Skała', 'michcio', 'naruku', 'Pawlo', 'Bucu', 'Koziełło', 'Chunky', 'seed', 'Rysia', 'rayan', 'zapienkanka', 'Caro', 'Sinnohne', 'Konrad', 'mumin']
var staliID = ['307556583918010368', '204612494184939520', '761629545089990696', '666666083352051795', '401783810431123486', '252511812862345217', '397393880917737484', '401464665768591380', '857208529517936640', '691720485343592469', '774962085905039390', '482266076197945374', '543067396429053973', '544574014002036757', '989834353502724107', '519251367337132033', '232039769125683210', '353297737716072450', '613822922607427644', '307147613822779392', '601132577495187497', '328188487171964929', '595171807967969301', '396367121216569354', '464487493560172544', '461612096732528650', '467341905349443584', '505329578655481856', '355354852232265728', '513433233053188096', '1050643219760824350', '404329068084068374', '513367715105472513', '658771911639171093', '531164512443957250', '478552348818669570']



exports.run = (konkursy, użytkownicy, channel, typ, rokS) => {
  if(konkursy.length == 0){
    channel.send('pusta taBlK')
    return
  }

  if(konkursy.length < 3){
    channel.send('za mało osób ażeby użyć tN wzór tabL')
    return
  }

  if(['ind', 'druż', 'duety', 'mn'].includes(typ)){
    channel.send('Tn wzór tabL ńe wspiRa Tgo typu. Użyj innego wzoru')
    return
  }

  var obietnice = []
  if(typ != 'mś' && typ != 'mśwl') obietnice.push(Canvas.loadImage(`./photos/${typ}.png`))
  else if(typ == 'mś') obietnice.push(Canvas.loadImage(`./photos/ms.png`))
  else obietnice.push(Canvas.loadImage(`./photos/mswl.png`))

  for(let n = 0; n < konkursy.length; n++){
    let znaleziono = false
    for(let m in listaKrajów){
      if(listaKrajów[m] == konkursy[n].kraj){
        if(listaKodów2[m] == 'HL') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Saint_Helena.svg/1920px-Flag_of_Saint_Helena.svg.png?20230803000817`))
        else if(listaKodów2[m] == 'AC') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Ascension_Island.svg/1920px-Flag_of_Ascension_Island.svg.png`))
        else if(listaKodów2[m] == 'TA') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Tristan_da_Cunha.svg/1920px-Flag_of_Tristan_da_Cunha.svg.png`))
        else obietnice.push(Canvas.loadImage(`https://raw.githubusercontent.com/hampusborgos/country-flags/main/png1000px/${listaKodów2[m].toLowerCase()}.png`))
        znaleziono = true
        break
      }
    }
    if(!znaleziono){
      obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Olympic_flag.svg/2560px-Olympic_flag.svg.png`))
    }

    if(użytkownicy[n].avatar !== null) obietnice.push(Canvas.loadImage(`https://cdn.discordapp.com/avatars/${użytkownicy[n].id}/${użytkownicy[n].avatar}.png`))
    else obietnice.push(Canvas.loadImage(`https://cdn.discordapp.com/embed/avatars/0.png`))
  }

  if(rokS.length < 3){
    obietnice.push(Canvas.loadImage(`./photos/0.png`))
    obietnice.push(Canvas.loadImage(`./photos/${rokS[0]}.png`))
    obietnice.push(Canvas.loadImage(`./photos/${rokS[1]}.png`))
    rokS = '20' + rokS
  }
  else{
    obietnice.push(Canvas.loadImage(`./photos/${rokS[0]}.png`))
    obietnice.push(Canvas.loadImage(`./photos/${rokS[1]}.png`))
    obietnice.push(Canvas.loadImage(`./photos/${rokS[2]}.png`))
    rokS = '2' + rokS
  }
  
  Promise.all(obietnice).then(async (fotki) => {
    var nr = 1
    for(let i = 0; i < konkursy.length; i = i + 10){
      var wysokośćOsoby = 250;
      if(i == 0){
        var baner = 1800
        var canvas = Canvas.createCanvas(3000, baner + wysokośćOsoby * 10 - 100)
      }
      else{
        var baner = 200
        var canvas = Canvas.createCanvas(3000, wysokośćOsoby * /*Math.min(konkursy.length - i, */10);
      }
      var context = canvas.getContext('2d');
      context.fillStyle = "white";
      context.font = "Regular 400 140px LilitaOne";


      const rysujAwatar = (x, y, r, margines, img) => {
        context.save(); 

        context.beginPath();
        context.arc(x, y, r + margines, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = "black";
        context.fill();

        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        context.drawImage(img, x - r, y - r, 2 * r, 2 * r);

        context.restore()
      }


      const rysujFlagę = (x, y, m, w, img) => {
        context.save();
        var ratio = img.height/img.width
        
        context.beginPath();
        context.roundRect(x-m, y-m, w+2*m, w*ratio+2*m, m);
        context.fillStyle = "black";
        context.fill();

        context.beginPath();
        context.roundRect(x, y, w, w*ratio, m*0.6);
        context.clip();
        context.drawImage(img, x, y, w, w*ratio);

        context.restore()
      }


      const okupantMiejsca = (i) => {
        if(staliID.indexOf(użytkownicy[i].id) == -1){
          var text = użytkownicy[i].username
          var textWidth = context.measureText(text).width;
          var maxWidth = 2000
          if(i <= 2) maxWidth = 800
          if (textWidth > maxWidth) {
            while (textWidth > maxWidth && text.length > 0) {
              text = text.slice(0, -1);
              textWidth = context.measureText(text).width;
            }
            text += "...";
          }
          return text
        }
        else return staliNicki[staliID.indexOf(użytkownicy[i].id)]
      }


      var j = i
      if(i == 0){
        j = 3
        context.drawImage(fotki[0], 0, 0)
        context.textAlign = "center";

        rysujAwatar(1500, 1500, 310, 40, fotki[2])
        context.fillText(okupantMiejsca(0), 1500, 2000);
        context.fillText(`${konkursy[0].punkty} pkt.`, 1500, 2160);
        rysujFlagę(1700, 1200, 40, 200, fotki[1])

        rysujAwatar(650, 1600, 220, 40, fotki[4])
        context.fillText(okupantMiejsca(1), 650, 2000);
        context.fillText(`${konkursy[1].punkty} pkt.`, 650, 2160);
        rysujFlagę(800, 1320, 40, 200, fotki[3])

        rysujAwatar(2350, 1600, 220, 40, fotki[6])
        context.fillText(okupantMiejsca(2), 2350, 2000);
        context.fillText(`${konkursy[2].punkty} pkt.`, 2350, 2160);
        rysujFlagę(2500, 1320, 40, 200, fotki[5])
      }

      while((j < i + 10) && (j < konkursy.length)){
        context.textAlign = "center";
        if(j > 0 && konkursy[j].punkty != konkursy[j-1].punkty) nr = j + 1
        context.fillText(nr, 70, baner + (j % 10) * wysokośćOsoby);
        context.fillText(konkursy[j].punkty, 2750, baner + (j % 10) * wysokośćOsoby);
        context.textAlign = "left";
        rysujAwatar(300, baner + (j % 10) * wysokośćOsoby - 50, 100, 0, fotki[2 * j + 2])
        rysujFlagę(330, baner + (j % 10) * wysokośćOsoby - 160, 20, 110, fotki[2 * j + 1])
        context.fillText(okupantMiejsca(j), 500, baner + (j % 10) * wysokośćOsoby);
        j++;
      }

      if(['tcp', 'ps', 'wt', 'k3'].includes(typ) && i == 0){
        let szerokościCyfr = [186, 116, 150, 155, 180, 143, 165, 153, 168, 162]
        let wysokośćCyf = 230
        let y = 173
        let x;
        if(typ == 'tcp') x = 927
        if(typ == 'wt') x = 810
        if(typ == 'k3') x = 777
        if(typ == 'ps'){
          x = 639
          y = 94
        }
        x += 8
        for(let k = 1; k < 4; k++){
          context.drawImage(fotki[konkursy.length * 2 + k], x, y, szerokościCyfr[+rokS[k]], wysokośćCyf);
          x += szerokościCyfr[+rokS[k]] + 8
        }
      }

      if(['io', 'mś', 'mśwl', 'mn'].includes(typ) && i == 0){
        context.font = "140px Arial";
        context.textAlign = "center"
        context.fillText(typ + ' ' + rokS, 1500, 250);
      }

      if(['tdw', 'pt', 'vc', 'wk'].includes(typ) && i == 0){
        context.font = "Regular 400 100px LilitaOne";
        context.textAlign = "center"
        context.fillText(`${rokS[1]}\n${rokS[2]}\n${rokS[3]}`, 2818, 756);
      }

      const buffer = canvas.toBuffer('image/png');
    	const attachment = new AttachmentBuilder(buffer, { name: 'profile-image.png' });
      channel.send({ files: [attachment] });
    }
  })
};