const db = require('../databaseMain/db.js')
const punktacja = require("./../others/punktacja.js")
var listaKrajów = ['Afganistan', 'Albania', 'Algieria', 'Andora', 'Angola', 'Anguilla', 'Antarktyka', 'Antigua i Barbuda', 'Arabia Saudyjska', 'Argentyna', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbejdżan', 'Bahamy', 'Bahrajn', 'Bangladesz', 'Barbados', 'Belgia', 'Belize', 'Benin', 'Bermudy', 'Bhutan', 'Białoruś', 'Birma', 'Boliwia', 'Bonaire, Sint Eustatius i Saba', 'Holandia Karaibska', 'Bośnia i Hercegowina', 'Botswana', 'Brazylia', 'Brunei', 'Brytyjskie Terytorium Oceanu Indyjskiego', 'Brytyjskie Wyspy Dziewicze', 'Bułgaria', 'Burkina Faso', 'Burundi', 'Chile', 'Chiny', 'Chorwacja', 'Curaçao', 'Cypr', 'Czad', 'Czarnogóra', 'Czechy', 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych', 'Dania', 'Demokratyczna Republika Konga', 'Dominika', 'Dominikana', 'Dżibuti', 'Egipt', 'Ekwador', 'Erytrea', 'Estonia', 'Eswatini', 'Etiopia', 'Falklandy', 'Fidżi', 'Filipiny', 'Finlandia', 'Francja', 'Francuskie Terytoria Południowe i Antarktyczne', 'FTPiA', 'Gabon', 'Gambia', 'Georgia Południowa i Sandwich Południowy', 'Ghana', 'Gibraltar', 'Grecja', 'Grenada', 'Grenlandia', 'Gruzja', 'Guam', 'Guernsey', 'Gujana Francuska', 'Gujana', 'Gwadelupa', 'Gwatemala', 'Gwinea Bissau', 'Gwinea Równikowa', 'Gwinea', 'Haiti', 'Hiszpania', 'Holandia', 'Honduras', 'Hongkong', 'Indie', 'Indonezja', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Izrael', 'Jamajka', 'Japonia', 'Jemen', 'Jersey', 'Jordania', 'Kajmany', 'Kambodża', 'Kamerun', 'Kanada', 'Katar', 'Kazachstan', 'Kenia', 'Kirgistan', 'Kiribati', 'Kolumbia', 'Komory', 'Kongo', 'Korea Południowa', 'Korea Północna', 'Kosowo', 'Kostaryka', 'Kuba', 'Kuwejt', 'Laos', 'Lesotho', 'Liban', 'Liberia', 'Libia', 'Liechtenstein', 'Litwa', 'Luksemburg', 'Łotwa', 'Macedonia Północna', 'Madagaskar', 'Majotta', 'Makau', 'Malawi', 'Malediwy', 'Malezja', 'Mali', 'Malta', 'Malwiny', 'Mariany Północne', 'Maroko', 'Martynika', 'Mauretania', 'Mauritius', 'Meksyk', 'Mikronezja', 'Mjanma', 'Mołdawia', 'Monako', 'Mongolia', 'Montserrat', 'Mozambik', 'Namibia', 'Nauru', 'Nepal', 'Niemcy', 'Niger', 'Nigeria', 'Nikaragua', 'Niue', 'Norfolk', 'Norwegia', 'Nowa Kaledonia', 'Nowa Zelandia', 'Oman', 'Pakistan', 'Palau', 'Palestyna', 'Panama', 'Papua-Nowa Gwinea', 'Paragwaj', 'Peru', 'Pitcairn', 'Polinezja Francuska', 'Polska', 'Portoryko', 'Portugalia', 'Republika Południowej Afryki', 'Republika Środkowoafrykańska', 'Republika Zielonego Przylądka', 'Reunion', 'Rosja', 'RPA', 'Rumunia', 'Rwanda', 'Sahara Zachodnia', 'Saint Kitts i Nevis', 'Saint Lucia', 'Saint Vincent i Grenadyny', 'Saint-Barthélemy', 'Saint-Martin', 'Saint-Pierre i Miquelon', 'Salwador', 'Samoa Amerykańskie', 'Samoa', 'San Marino', 'Senegal', 'Serbia', 'Seszele', 'Sierra Leone', 'Singapur', 'Sint Maarten', 'Słowacja', 'Słowenia', 'Somalia', 'Sri Lanka', 'Stany Zjednoczone', 'Suazi', 'Sudan', 'Sudan Południowy', 'Surinam', 'Svalbard i Jan Mayen', 'Syria', 'Szwajcaria', 'Szwecja', 'Tadżykistan', 'Tajlandia', 'Tajwan', 'Tanzania', 'Timor Wschodni', 'Togo', 'Tokelau', 'Tonga', 'Trynidad i Tobago', 'Tunezja', 'Turcja', 'Turkmenistan', 'Turks i Caicos', 'Tuvalu', 'Uganda', 'Ukraina', 'Urugwaj', 'Uzbekistan', 'Vanuatu', 'Wallis i Futuna', 'Watykan', 'Wenezuela', 'Węgry', 'Wielka Brytania', 'Wietnam', 'Włochy', 'Wybrzeże Kości Słoniowej', 'Wyspa Bouveta', 'Wyspa Bożego Narodzenia', 'Wyspa Man', 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha', 'Wyspy Alandzkie', 'Wyspy Cooka', 'Wyspy Dziewicze Stanów Zjednoczonych', 'Wyspy Heard i McDonald', 'Wyspy Heard i McDonalda', 'Wyspy Kokosowe', 'Wyspy Marshalla', 'Wyspy Owcze', 'Wyspy Salomona', 'Wyspy Świętego Tomasza i Książęca', 'Wyspy Zielonego Przylądka', 'Zambia', 'Zimbabwe', 'Zjednoczone Emiraty Arabskie', 'Anglia', 'Walia', 'Szkocja', 'Irlandia Północna', 'Wyspa Świętej Heleny','Wyspa Wniebowstąpienia', 'Tristan da Cunha']
var listaKodów2 = ['AF', 'AL', 'DZ', 'AD', 'AO', 'AI', 'AQ', 'AG', 'SA', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BY', 'MM', 'BO', 'BQ', 'BQ', 'BA', 'BW', 'BR', 'BN', 'IO', 'VG', 'BG', 'BF', 'BI', 'CL', 'CN', 'HR', 'CW', 'CY', 'TD', 'ME', 'CZ', 'UM', 'DK', 'CD', 'DM', 'DO', 'DJ', 'EG', 'EC', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FJ', 'PH', 'FI', 'FR', 'TF', 'TF', 'GA', 'GM', 'GS', 'GH', 'GI', 'GR', 'GD', 'GL', 'GE', 'GU', 'GG', 'GF', 'GY', 'GP', 'GT', 'GW', 'GQ', 'GN', 'HT', 'ES', 'NL', 'HN', 'HK', 'IN', 'ID', 'IQ', 'IR', 'IE', 'IS', 'IL', 'JM', 'JP', 'YE', 'JE', 'JO', 'KY', 'KH', 'CM', 'CA', 'QA', 'KZ', 'KE', 'KG', 'KI', 'CO', 'KM', 'CG', 'KR', 'KP', 'XK', 'CR', 'CU', 'KW', 'LA', 'LS', 'LB', 'LR', 'LY', 'LI', 'LT', 'LU', 'LV', 'MK', 'MG', 'YT', 'MO', 'MW', 'MV', 'MY', 'ML', 'MT', 'FK', 'MP', 'MA', 'MQ', 'MR', 'MU', 'MX', 'FM', 'MM', 'MD', 'MC', 'MN', 'MS', 'MZ', 'NA', 'NR', 'NP', 'DE', 'NE', 'NG', 'NI', 'NU', 'NF', 'NO', 'NC', 'NZ', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PN', 'PF', 'PL', 'PR', 'PT', 'ZA', 'CF', 'CV', 'RE', 'RU', 'ZA', 'RO', 'RW', 'EH', 'KN', 'LC', 'VC', 'BL', 'MF', 'PM', 'SV', 'AS', 'WS', 'SM', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SO', 'LK', 'US', 'SZ', 'SD', 'SS', 'SR', 'SJ', 'SY', 'CH', 'SE', 'TJ', 'TH', 'TW', 'TZ', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'UY', 'UZ', 'VU', 'WF', 'VA', 'VE', 'HU', 'GB', 'VN', 'IT', 'CI', 'BV', 'CX', 'IM', 'SH', 'AX', 'CK', 'VI', 'HM', 'HM', 'CC', 'MH', 'FO', 'SB', 'ST', 'CV', 'ZM', 'ZW', 'AE', 'GB-ENG', 'GB-WLS', 'GB-SCT', 'GB-NIR', 'SH', 'AC', 'TA']


exports.run = (hasło, drużynyDruż, drużynyInd, zawodnicyJSON, channel) => {
    db.set(hasło +  ' i', zawodnicyJSON, channel)

    for(let n = 0; n < drużynyDruż.length; n++){
        let znaleziono = false
        for(let m in listaKrajów){
            if(listaKrajów[m] == drużynyDruż[n].nazwa){
                if(!listaKodów2[m].startsWith('GB')) drużynyDruż[n].flaga = `flag_${listaKodów2[m].toLowerCase()}`
                else if(listaKodów2[m] == 'GB-ENG')  drużynyDruż[n].flaga = `england`
                else if(listaKodów2[m] == 'GB-WLS')  drużynyDruż[n].flaga = `wales`
                else if(listaKodów2[m] == 'GB-SCT')  drużynyDruż[n].flaga = `scotland`
                else if(listaKodów2[m] == 'GB-NIR')  drużynyDruż[n].flaga = `northern_ireland`
                znaleziono = true
                break
            }
        }
        if(!znaleziono) drużynyDruż[n].flaga = 'united_nations'
    }

    var output = ''
    var nr = 1
    for(let q = 0; q < drużynyDruż.length; q++){
        if(q > 0 && drużynyDruż[q].punkty != drużynyDruż[q-1].punkty) nr = q + 1
        output += `${nr}. :${drużynyDruż[q].flaga}: ${drużynyDruż[q].nazwa}—  ${drużynyDruż[q].punkty} pkt. `
        if(q < 3) output += `(<@${drużynyDruż[q].id1}>`
        if(q < 3 && drużynyDruż[q].id2) output += ` i <@${drużynyDruż[q].id2}>`
        if(q < 3) output += `)`
        output += '\n'
    }
    output != '' ? channel.send(output) : channel.send('tabLa jSt pusta')        

    
    for(let j = 0; j < drużynyDruż.length; j++){
        drużynyDruż[j].punkty = punktacja.run('vc', 'x', j+1)
        for(let k in drużynyInd){
            if(drużynyInd[k].nazwa == drużynyDruż[j].nazwa) drużynyDruż[j].punkty += drużynyInd[k].punkty
        }
    }
    drużynyJSON = JSON.stringify(drużynyDruż)
    db.set(hasło + ' n', drużynyJSON, channel)
}