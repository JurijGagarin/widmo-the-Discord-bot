const cron = require('node-cron');

exports.run = (client, message, argumenty) => {
  let dni = message.content.toLowerCase().split(/\r?\n/)
  let rok = dni.shift().split(' ')[1]
  let miesiącIrl = (rok - 63) % 12 + 1
  for(let i = 0; i < dni.length; i++){
    if(['ind', 'druż', 'duety', 'k3', 'tcp', 'wt', 'ps', 'pt', 'wk', 'vc', 'tdw', 'mn', 'gp', 'bf', "tcp'62", "k3'22"].includes(dni[i])) continue
    if(['konkurs indywidualny', 'k. indywidualny', 'konkurs ind.', 'konkurs ind'].includes(dni[i])) dni[i] = 'ind'
    else if(['konkurs drużynowy', 'k. drużynowy', 'konkurs druż.', 'konkurs druż'].includes(dni[i])) dni[i] = 'druż'
    else if(['konkurs duetów', 'k. duetów'].includes(dni[i])) dni[i] = 'k3'
    else if(['kremówka3', 'kremówka 3'].includes(dni[i])) dni[i] = 'k3'
    else if('turniej czterech papieży' == dni[i]) dni[i] = 'tcp'
    else if(['world tour', 'wt x2'].includes(dni[i])){
      if(miesiącIrl == 7 || miesiącIrl == 8) dni[i] = 'wts'
      else dni[i] = 'wt'
    }
    else if('papieżos' == dni[i]) dni[i] = 'ps'
    else if('poland tour' == dni[i]) dni[i] = 'pt'
    else if(['watykańczyk', 'watykanczyk'].includes(dni[i])) dni[i] = 'wk'
    else if('vadovitze cup' == dni[i]) dni[i] = 'vc'
    else if('tour de wojtyła' == dni[i]) dni[i] = 'tdw'
    else if('maraton' == dni[i]) dni[i] = 'mn'
    else if('grand prix' == dni[i]) dni[i] = 'gp'
    else if(['boss fight', 'papiez cup boss fight', 'papież cup boss fight'].includes(dni[i])) dni[i] = 'k3'
    else if(dni[i].includes('io') || dni[i].includes('Igrzyska Olimpijskie')){
      if(dni[i].includes('druż')) dni[i] = 'iod'
      else if(dni[i].includes('ind')) dni[i] = 'iot'
      else message.reply(`IO ani druż, ani ind? wtf?`)
    }
    else if(dni[i].includes('mśwl') || dni[i].includes('Mistrzostwa Świata w Lotach')){
      if(dni[i].includes('druż')) dni[i] = 'mśwld'
      else if(dni[i].includes('ind')) dni[i] = 'mśwlt'
      else message.reply(`MŚwL ani druż, ani ind? wtf?`)
    }
    else if(dni[i].includes('mś') || dni[i].includes('Mistrzostwa Świata')){
      if(dni[i].includes('druż')) dni[i] = 'mśd'
      else if(dni[i].includes('ind')) dni[i] = 'mśt'
      else message.reply(`MŚ ani druż, ani ind? wtf?`)
    }
    else if(dni[i] == 'last cup') dni[i] = 'last cup'
    else{
      message.reply(`Dla dńa ${i+1}. ńe znaleźono odpowiadająCgo turńeju. Sprawdź pisowńę i użyj &dzieńkalendarza`)
      dni[i] = '???'
    }
  }
  let output = `Pomyślnie ustawiono kalendarz:\n`
  let podciąg = []
  podciąg[0] = 1
  let iot = 1
  for(let i = 0; i < dni.length; i++){
    output += i+1 + '.- ' + dni[i] + '\n'
    if(dni[i] == 'iot'){
      iot++
      podciąg[i] = iot
    }
    else if(dni[i - 1] == dni[i]) podciąg[i] = podciąg[i - 1] + 1
    else podciąg[i] = 1
  }  
  output += `\nPamiejtaj, że konkursy Last Cupa, WT strefowego, Papieżosa, Maratonu, Grand Prix, Boss Fight, MŚwL ind. i MŚ ind. nie są obsługiwane przez autopilota (co nie nie stoi na przeszkodzie ich obecności w powyższym kalendarzu)`
  message.reply(output)

/*
  function czas(start){
    return (start - 27 - 1) * 60000 - 15000
  }

  client.kalendarz = cron.schedule(`27 21 * ${miesiącIrl} *`, () => {
    let d = new Date()
    let dzieńIrl = d.getDate()
    let curtyp = dni[dzieńIrl + 1]
    let dzień = podciąg[dzieńIrl + 1]

    if(['ind', 'druż', 'duety', 'tcp', 'wt', 'pt', 'wk', 'vc'].includes(curtyp)) setTimeout(kolektor(37, '874220383715344424', curtyp, dzień, 1), czas(37))
    if(curtyp == 'k3'){
      setTimeout(kolektor(30, '874220383715344424', curtyp, (dzień - 1) * 3 + 1, 1), czas(30))
      setTimeout(kolektor(33, '874220383715344424', curtyp, (dzień - 1) * 3 + 2, 1), czas(33))
      setTimeout(kolektor(37, '874220383715344424', curtyp, (dzień - 1) * 3 + 3, 1), czas(37))
    }
    if(curtyp == 'iod' || curtyp == 'iot'){
      setTimeout(kolektor(37, '898279749628088331', 'io', dzień, 1), czas(37))
      setTimeout(kolektor(47, '898279749628088331', 'io', dzień, 1), czas(47))
    }
    if(curtyp == 'mśwld') setTimeout(kolektor(37, '875829411323203624', 'mśwl', 1, 1), czas(37))
    if(curtyp == 'mśd') setTimeout(kolektor(37, '884780527721271356', 'mś', 1, 1), czas(37))
  })

  cron.schedule(`27 9 * ${miesiącIrl} 6`, () => {
    let d = new Date()
    let dzieńIrl = d.getDate()
    let curtyp = dni[dzieńIrl + 1]

    if(curtyp == 'wt' || curtyp == 'tdw') setTimeout(kolektor(37, '898279749628088331', curtyp, dzień, 1), czas(37))
  })

  function kolektor(start, kanał, typ, dzień, seria){
    const collectorFilter = (m) => {
      if(message.author.bot) return false
      if(message.content.includes(start) || message.content.includes('37')){
        let słowa = message.content.split(' ')
        for(let i = 0; i < słowa.length; i++){
          if(!słowa[i].starsWith('htt') && (słowa[i].includes('37') || słowa[i].includes(start))){
            return true
          }
        }
      }
      return false
    }
    const collector = client.channels.cache.get(kanał).createMessageCollector({ filter: collectorFilter, time: 2 * 60000 + 20000 });

    collector.on('end', kolektor => {
      kolektor.forEach(el => {
        console.log(el)
      });

      //kolektor.sort((a, b) => (a.punkty < b.punkty) ? 1 : -1);
    });
  }*/
}

exports.name = "ustawkalendarz";