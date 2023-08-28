exports.run = (client, message, argumenty) => {
  var tekst = argumenty.join(' ')
  var tekstOst = ''
  var znajdź = [' nad', ' od', ' pod', ' ponad', ' przed', ' trans', ' eks', ' cis', ' dys', ' seks', ' dez', ' dyz', ' roz', 'erz', 'eni', 'esi', 'esz', 'be', 'ce', 'de', 'ef', 'gie', 'ha', 'jot', 'ka', 'el', 'eł', 'em', 'en', 'er', 'es', 'te', 'wu', 'iks', 'igrek', 'zet', 'cha', 'czy', 'dzy', 'dzi', 'dży', 'szy', 'eń', 'eś', 'żet', 'ci', 'ni', 'si', 'zi', 'pi']
  var zamień = [' nad', ' od', ' pod', ' ponad', ' przed', ' trans', ' eks', ' cis', ' dys', ' seks', ' dez', ' dyz', ' roz', 'erz', 'eni', 'esi', 'esz', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ł', 'M', 'N', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', 'CH', 'CZ', 'DZ', 'DŹ', 'DŻ', 'SZ', 'Ń', 'Ś', 'Ż', 'ć', 'ń', 'ś', 'ź', 'π']

  for(let i = 0; i < tekst.length; i++){
    let znaleziono = false
    for(let j in znajdź){
      if(tekst.substr(i, znajdź[j].length) == znajdź[j]){
        znaleziono = true
        tekstOst += zamień[j]
        i += znajdź[j].length - 1
        break;
      }
    }
    if(znaleziono == false) tekstOst += tekst[i]
  }
  tekstOst == '' ? 'brak Tkstu' : 0
  message.reply(tekstOst)
}

exports.name = "kakowy";