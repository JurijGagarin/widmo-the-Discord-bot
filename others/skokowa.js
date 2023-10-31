const { AttachmentBuilder } = require('discord.js')
const Canvas = require('canvas');
//const fetch = require('node-fetch');
Canvas.registerFont('./photos/Barlow-SemiBold.ttf', { family: 'Barlow' });
Canvas.registerFont('./photos/bahnschrift.ttf', { family: 'Bahnschrift' });
var listaKrajów = ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antarktyka', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Birma', 'Boliwia', 'Bonaire, Sint Eustatius i Saba', 'Holandia Karaibska', 'Bośnia i Hercegowina', 'Botswana', 'Brazylia', 'Brunei', 'Brytyjskie Terytorium Oceanu Indyjskiego', 'Brytyjskie Wyspy Dziewicze', 'Bułgaria', 'Burkina Faso', 'Burundi', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Eswatini', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Francuskie Terytoria Południowe i Antarktyczne', 'FTPiA', 'Gabon', 'Gambia', 'Georgia Południowa i Sandwich Południowy', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana Francuska', 'Gujana', 'Gwadelupa', 'Gwatemala', 'Gwinea Bissau', 'Gwinea Równikowa', 'Gwinea', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kosowo', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Łotwa', 'Macedonia Północna', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Malwiny', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Mołdawia', 'Monako', 'Mongolia', 'Montserrat', 'Mozambik', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Palestyna', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Środkowoafrykańska', 'Republika Zielonego Przylądka', 'Reunion', 'Rosja', 'RPA', 'Rumunia', 'Rwanda', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa Amerykańskie', 'Samoa', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Maarten', 'Słowacja', 'Słowenia', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Suazi', 'Sudan', 'Sudan Południowy', 'Surinam', 'Svalbard i Jan Mayen', 'Syria', 'Szwajcaria', 'Szwecja', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Węgry', 'Wielka Brytania', 'Wietnam', 'Włochy', 'Wybrzeże Kości Słoniowej', 'Wyspa Bouveta', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha', 'Wyspy Alandzkie', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Heard i McDonald', 'Wyspy Heard i McDonalda', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Wyspy Zielonego Przylądka', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Anglia', 'Walia', 'Szkocja', 'Irlandia Północna', 'Wyspa Świętej Heleny','Wyspa Wniebowstąpienia', 'Tristan da Cunha', 'Bougainville']
var listaKodów2 = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AQ', 'AG', 'SA', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BY', 'MM', 'BO', 'BQ', 'BQ', 'BA', 'BW', 'BR', 'BN', 'IO', 'VG', 'BG', 'BF', 'BI', 'CL', 'CN', 'HR', 'CW', 'CY', 'TD', 'ME', 'CZ', 'UM', 'DK', 'CD', 'DM', 'DO', 'DJ', 'EG', 'EC', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FJ', 'PH', 'FI', 'FR', 'TF', 'TF', 'GA', 'GM', 'GS', 'GH', 'GI', 'GR', 'GD', 'GL', 'GE', 'GU', 'GG', 'GF', 'GY', 'GP', 'GT', 'GW', 'GQ', 'GN', 'HT', 'ES', 'NL', 'HN', 'HK', 'IN', 'ID', 'IQ', 'IR', 'IE', 'IS', 'IL', 'JM', 'JP', 'YE', 'JE', 'JO', 'KY', 'KH', 'CM', 'CA', 'QA', 'KZ', 'KE', 'KG', 'KI', 'CO', 'KM', 'CG', 'KR', 'KP', 'XK', 'CR', 'CU', 'KW', 'LA', 'LS', 'LB', 'LR', 'LY', 'LI', 'LT', 'LU', 'LV', 'MK', 'MG', 'YT', 'MO', 'MW', 'MV', 'MY', 'ML', 'MT', 'FK', 'MP', 'MA', 'MQ', 'MR', 'MU', 'MX', 'FM', 'MM', 'MD', 'MC', 'MN', 'MS', 'MZ', 'NA', 'NR', 'NP', 'DE', 'NE', 'NG', 'NI', 'NU', 'NF', 'NO', 'NC', 'NZ', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PN', 'PF', 'PL', 'PR', 'PT', 'ZA', 'CF', 'CV', 'RE', 'RU', 'ZA', 'RO', 'RW', 'EH', 'KN', 'LC', 'VC', 'BL', 'MF', 'PM', 'SV', 'AS', 'WS', 'SM', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SO', 'LK', 'US', 'SZ', 'SD', 'SS', 'SR', 'SJ', 'SY', 'CH', 'SE', 'TJ', 'TH', 'TW', 'TZ', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'UY', 'UZ', 'VU', 'WF', 'VA', 'VE', 'HU', 'GB', 'VN', 'IT', 'CI', 'BV', 'CX', 'IM', 'SH', 'AX', 'CK', 'VI', 'HM', 'HM', 'CC', 'MH', 'FO', 'SB', 'ST', 'CV', 'ZM', 'ZW', 'AE', 'GB-ENG', 'GB-WLS', 'GB-SCT', 'GB-NIR', 'SH', 'AC', 'TA', 'BU']
var listaKodów3 = ['AFG', 'ALB', 'DZA', 'AND', 'AGO', 'AIA', 'ANT', 'ATG', 'SAU', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BLR', 'MMR', 'BOL', 'BES', 'BES', 'BIH', 'BWA', 'BRA', 'BRN', 'IOT', 'VGB', 'BGR', 'BFA', 'BDI', 'CHL', 'CHN', 'HRV', 'CUW', 'CYP', 'TCD', 'MNE', 'CZE', 'UMI', 'DNK', 'COD', 'DMA', 'DOM', 'DJI', 'EGY', 'ECU', 'ERI', 'EST', 'SWZ', 'ETH', 'FLK', 'FJI', 'PHL', 'FIN', 'FRA', 'ATF', 'ATF', 'GAB', 'GMB', 'SGS', 'GHA', 'GIB', 'GRC', 'GRD', 'GRL', 'GEO', 'GUM', 'GGY', 'GUF', 'GUY', 'GLP', 'GTM', 'GNB', 'GNQ', 'GIN', 'HTI', 'ESP', 'NLD', 'HND', 'HKG', 'IND', 'IDN', 'IRQ', 'IRN', 'IRL', 'ISL', 'ISR', 'JAM', 'JPN', 'YEM', 'JEY', 'JOR', 'CYM', 'KHM', 'CMR', 'CAN', 'QAT', 'KAZ', 'KEN', 'KGZ', 'KIR', 'COL', 'COM', 'COG', 'KOR', 'PRK', 'KOS', 'CRI', 'CUB', 'KWT', 'LAO', 'LSO', 'LBN', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'LVA', 'MKD', 'MDG', 'MYT', 'MAC', 'MWI', 'MDV', 'MYS', 'MLI', 'MLT', 'FLK', 'MNP', 'MAR', 'MTQ', 'MRT', 'MUS', 'MEX', 'FSM', 'MMR', 'MDA', 'MCO', 'MNG', 'MSR', 'MOZ', 'NAM', 'NRU', 'NPL', 'DEU', 'NER', 'NGA', 'NIC', 'NIU', 'NFK', 'NOR', 'NCL', 'NZL', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PCN', 'PYF', 'POL', 'PRI', 'PRT', 'ZAF', 'CAF', 'CPV', 'REU', 'RUS', 'ZAF', 'ROU', 'RWA', 'ESH', 'KNA', 'LCA', 'VCT', 'BLM', 'MAF', 'SPM', 'SLV', 'ASM', 'WSM', 'SMR', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SOM', 'LKA', 'USA', 'SWZ', 'SDN', 'SSD', 'SUR', 'SJM', 'SYR', 'CHE', 'SWE', 'TJK', 'THA', 'TWN', 'TZA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'URY', 'UZB', 'VUT', 'WLF', 'VAT', 'VEN', 'HUN', 'GBR', 'VNM', 'ITA', 'CIV', 'BVT', 'CXR', 'IMN', 'SHN', 'ALA', 'COK', 'VIR', 'HMD', 'HMD', 'CCK', 'MHL', 'FRO', 'SLB', 'STP', 'CPV', 'ZMB', 'ZWE', 'ARE', 'ENG', 'WAL', 'SCO', 'NIR', 'SHN', 'ASC', 'TDA', 'BNG']


exports.run = (konkursy, użytkownicy, channel, rodzaj, typ) => {   
  var obietnice = []
  obietnice.push(Canvas.loadImage(`./photos/sPelna.png`))  
  obietnice.push(Canvas.loadImage(`./photos/sGora.png`))  
  obietnice.push(Canvas.loadImage(`./photos/sModul.png`))  
  obietnice.push(Canvas.loadImage(`./photos/sStopka.png`))

  for(let n = 0; n < konkursy.length; n++){
    let znaleziono = false
    for(let m in listaKrajów){
      if(listaKrajów[m] == konkursy[n].kraj){
        konkursy[n].kod3 = listaKodów3[m]
        if(listaKodów2[m] == 'HL') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Saint_Helena.svg/1920px-Flag_of_Saint_Helena.svg.png?20230803000817`))
        else if(listaKodów2[m] == 'AC') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Ascension_Island.svg/1920px-Flag_of_Ascension_Island.svg.png`))
        else if(listaKodów2[m] == 'TA') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Tristan_da_Cunha.svg/1920px-Flag_of_Tristan_da_Cunha.svg.png`))
        else if(listaKodów2[m] == 'BU') obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Flag_of_Bougainville.svg/1280px-Flag_of_Bougainville.svg.png`))
        else obietnice.push(Canvas.loadImage(`https://raw.githubusercontent.com/hampusborgos/country-flags/main/png1000px/${listaKodów2[m].toLowerCase()}.png`))
        znaleziono = true
        break
      }
    }
    if(!znaleziono){
      konkursy[n].kod3 = 'IOC'
      obietnice.push(Canvas.loadImage(`https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Olympic_flag.svg/2560px-Olympic_flag.svg.png`))
    }
  }
  
  Promise.all(obietnice).then(async (fotki) => {
    var nr = 1
    for(let i = 0; i < konkursy.length; i = i + 10){
    	if(konkursy.length - i >= 10){
        var canvas = Canvas.createCanvas(3000, 1700);
	      var context = canvas.getContext('2d');
        context.drawImage(fotki[0], 0, 0)
      }
      else{
        var canvas = Canvas.createCanvas(3000, 540 + (konkursy.length % 10) * 111);
	      var context = canvas.getContext('2d');
        context.drawImage(fotki[1], 0, 0)
        for(let j = 0; j < konkursy.length - i - 1; j++){
          context.drawImage(fotki[2], 0, 540 + j * 111)
        }
        context.drawImage(fotki[3], 0, 540 + (konkursy.length - i - 1) * 111)
      }
      
      context.textAlign = "center";
      context.fillStyle = "white";
      context.font = "77px Bahnschrift";
      var output = ''
      if(typ == 'ind' || typ == 'druż') output = 'PAPIEŻ CUP'
      if(typ == 'wt') output = 'WORLD TOUR'
      if(typ == 'k3' || typ == "k3'22") output = 'KREMÓWKA 3'
      if(typ == 'tcp' || typ == "tcp'62") output = 'TCP'
      if(typ == 'ps') output = 'PAPIEŻOS'
      if(typ == 'mś') output = 'MISTRZOSTWA ŚWIATA'
      if(typ == 'mśwl') output = 'MŚwL'
      if(typ == 'io') output = 'IGRZYSKA OLIMPIJSKIE'
      if(typ == 'mn') output = 'MARATON'
      output += ' KLASYFIKACJA GENERALNA'
      context.fillText(output.trim(), 1498, 84);
  
      context.font = "67px Bahnschrift";
      const dzisiaj = new Date();
      var dzień = dzisiaj.getDate();
      var miesiąc = dzisiaj.getMonth() + 1;
      if(dzień < 10) dzień = `0${dzień}`
      if(miesiąc < 10) miesiąc = `0${miesiąc}`
      context.fillText(`stan na ${dzień}.${miesiąc}`, 1498, 167);
  
      context.fillStyle = "black";
      context.font = "63px Bahnschrift";
      if(rodzaj == 'i' || rodzaj == 't') context.fillText('Klasyfikacja Indywidualna', 1498, 276);
      else context.fillText('Klasyfikacja Drużynowa', 1498, 276);
  
      context.textAlign = "left";
      context.fillStyle = "black";
      context.font = "SemiBold 600 56px Barlow";
      context.fillText(`ZAWODNICY OD ${i+1}. DO ${i+10}. MIEJSCA`, 530, 406);

      context.textAlign = "center";
      context.fillText(`PUNKTY`, 2121, 406);
      
      context.fillText(`STRATA`, 2417, 406);

      context.font = "70px Bahnschrift";
      var maxWidth = 1075
      for(let j = i; j < i + 10; j++){
        if(j >= konkursy.length) break

        context.textAlign = "center";
        context.fillStyle = "black";
        if(j > 0 && konkursy[j].punkty != konkursy[j-1].punkty) nr = j + 1
        context.fillText(nr, 431, 512 + (j % 10) * 111);

        context.textAlign = "left";
        context.fillStyle = "white";
        var text = użytkownicy[j].username
        var textWidth = context.measureText(text).width;
        if (textWidth > maxWidth) {
          while (textWidth > maxWidth && text.length > 0) {
            text = text.slice(0, -1);
            textWidth = context.measureText(text).width;
          }
          text += "...";
        }
        context.fillText(text, 530, 512 + (j % 10) * 111);

        context.textAlign = "right";
        context.font = "SemiBold 600 62px Barlow";
        context.fillText(konkursy[j].kod3, 1810, 507 + (j % 10) * 111);

        context.drawImage(fotki[j+4], 1830, 446 + (j % 10) * 111, 114, 76)  

        context.font = "70px Bahnschrift";
        context.fillText(konkursy[j].punkty, 2235, 512 + (j % 10) * 111);

        context.fillText(konkursy[j].punkty - konkursy[0].punkty, 2530, 512 + (j % 10) * 111);
      }
  
      const buffer = canvas.toBuffer('image/png');
    	const attachment = new AttachmentBuilder(buffer, { name: 'profile-image.png' });
    	channel.send({ files: [attachment] });
    }
  })
};