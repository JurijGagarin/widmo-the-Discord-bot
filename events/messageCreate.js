const { PermissionsBitField } = require('discord.js');
const kulkiDrop = require('../databaseBalls/kulkiDrop.js')

module.exports = (client, message) => {
  if(message.author.bot && message.author.id != '1102896148336885811') return;
  if(message.guild.id == '916357080754040833') kulkiDrop.run(client)
  if(message.content == '!bill') message.channel.send('po to boźa dała ręC żebyś sam se użył komNdy')

  if(message.content.startsWith('k!dodaj')) var argumenty = message.content.trim().split(/\s+/);
  else var argumenty = message.content.toLowerCase().trim().split(/\s+/);
  argumenty = argumenty.filter(element => element !== '');
  var polecenie = argumenty.shift()
  

  if(typeof polecenie == 'undefined'){
    return
  }
  else if(polecenie[0] == '&'){
    polecenie = polecenie.slice(1)
    if((polecenie == 'usuń' || polecenie == 'zweryfikuj' || polecenie == 'dodaj') &&
      !(message.guild.id == '1094901377731403866' || message.guild.id == '874212818176593930' || message.guild.id == '874357478672969768')){
        message.channel.send("ta KO[menda] może działać tylko na wybranych serwerach")
        return
    }

    if((polecenie == 'usuń' || polecenie == 'zweryfikuj') && !(message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id == '691720485343592469')){
      message.channel.send("co wolno wojewoDŹe to ńe Tobie")
      return
    }

    if(polecenie.startsWith('zz') && message.author.id != '691720485343592469'){
      message.channel.send("KO[menda] zbyt potężna dla zwykłego śmiRtLńK")
      return
    }


    
    const isN = (liczbaS) => { 
      let liczba = parseInt(liczbaS)
      return !isNaN(liczba) || (typeof liczbaS == 'undefined')
    }

    const wiad = (info) => message.channel.send(`wszystkie ślady wsKzują na to, że argumNt na miejscu ${info} ńe jSt liczbą`) 

    const isT = (typ) => {
      return ['ind', 'druż', 'duety', 'k3', 'tcp', 'wt', 'ps', 'io', 'mś', 'mśwl', 'pt', 'wk', 'vc', 'tdw', 'mn'].includes(typ) || (typeof typ == 'undefined')
    }

    const sprParam = () => {
      let ok = []
      if(polecenie == 'tabela') ok = ['nicki', 'pingi', 's', 'żw']
      if(polecenie == 'staty') ok = ['p1', 'top3', 'dsq']
      if(polecenie == 'usuń' || polecenie == 'spis') ok = ['w', 'dzw']

      if(!ok.includes(argumenty[0])) message.channel.send(`użyto złego parametru`)
      return ok.includes(argumenty[0])
    }
    
    const spr = (i) => {
      let j = 0
      if(i == 1) sprParam() ? j++ : 0
      else j++
      !isN(argumenty[i + 0]) ? wiad('roQ') : j++
      !isT(argumenty[i + 1]?.split('-')[0]) ? message.channel.send('wszystkie ślady wsKzują na to, że argumNt na miejscu typu ńe jSt poprawnym typM') : j++
      !isN(argumenty[i + 2]) ? wiad('dńa') : j++
      !isN(argumenty[i + 3]) ? wiad('sRii') : j++
      if(isN(argumenty[i + 0]) && +argumenty[i + 0] > 1000) argumenty[i + 0] = +argumenty[i + 0] % 1000
      return j != 5 ? true : false
    }

    if((polecenie == 'dodaj' || polecenie == 'zweryfikuj') && spr(0)) return
    if(['usuń', 'tabela', 'spis', 'staty'].includes(polecenie) && spr(1)) return


    if(!(polecenie == 'tabela' || polecenie == 'usuń') && (argumenty[2]?.split('-')[1] != null || typeof argumenty[2]?.split('-')[1] != 'undefined')){
      message.channel.send('zły typ')
      return
    }

    if(polecenie == 'tabela' && (argumenty[0] == 's' || argumenty[0] == 'żw')){
      if(!(message.member.permissions.has(PermissionsBitField.Flags.KickMembers) || message.author.id == '691720485343592469')){
        message.channel.send('ze względu niskie moce przerobowe bota obecnie uprawnienia do używania tego wzoru ma wyłącznie administracja, ażeby używać go do oficjalnych tabel')
        return
      }
      else message.channel.send('to może chwilę potrwać')
    }

    const sprDł = (min, max) => {
      let długość = argumenty.length
      let if1 = (długość >= min) && (długość <= max)
      if(!if1) message.channel.send(`wygląda na to, że ńe ma odpowiedńej liczby argumNtów`)
      return !if1
    }

    if(polecenie == 'zweryfikuj' && sprDł(3, 3)) return
    if(polecenie == 'usuń' && sprDł(5, 5)) return
    if(polecenie == 'tabela' && sprDł(3, 5)) return
    if(polecenie == 'spis' && sprDł(1, 4)) return
    if(polecenie == 'staty' && sprDł(2, 2)) return

    const cmd = client.commandsMain.get(polecenie);
    if (!cmd){
      message.channel.send("ńe ma takiej komNdy RomQ")
      return;
    }
    cmd.run(client, message, argumenty, false)
  }



  else if(polecenie.startsWith('k!')){
    polecenie = polecenie.slice(2)
    const cmd = client.commandsBalls.get(polecenie);
    if (!cmd){
      message.channel.send("Nie ma takiej komendy. Użyj k!pomoc jeśli nie wiesz co wpisać")
      return;
    }
    cmd.run(client, message, argumenty)
  }



  else if(polecenie.startsWith('p!')){
    polecenie = polecenie.slice(2)
    const cmd = client.commandsFun.get(polecenie);
    if (!cmd){
      message.channel.send("ńe ma takiej komNdy. Użyj &pomoc jeśli ńe wiesz co wpisać")
      return;
    }
    cmd.run(client, message, argumenty)
  }


  
  else{
    return
  }
};

exports.name = "messageCreate";