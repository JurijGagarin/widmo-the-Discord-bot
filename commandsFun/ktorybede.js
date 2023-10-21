exports.run = (client, message, argumenty) => {
  var los = Math.ceil(Math.random()*35)
  var efekt = '' + los
  if(los > 25) efekt = 'DSQ'
  if(los > 33) efekt = 'ostatni z DSQ'
  if(los > 34) efekt = 'DNS'
  message.reply(efekt)
}

exports.name = "ktorybede";