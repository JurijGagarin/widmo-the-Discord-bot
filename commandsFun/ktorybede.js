exports.run = (client, message, argumenty) => {
  var los = Math.floor(Math.random()*36)
  var efekt = '' + los
  if(los > 25) efekt = 'DSQ'
  if(los > 33) efekt = 'ostatni z DSQ'
  if(los > 34) efekt = 'DNS'
  message.channel.send(efekt)
}

exports.name = "ktorybede";