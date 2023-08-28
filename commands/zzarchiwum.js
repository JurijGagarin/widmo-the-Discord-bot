const fs = require('fs')
const mc = require('./../events/messageCreate.js')

exports.run = (client, message, argumenty) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    rok = argumenty[0]

    for(let klucz in dane){
        if(!klucz.startsWith(rok)) continue

        klucz = klucz.split(' ')
        klucz[1] += '-' + klucz.pop()
        klucz = klucz.join(' ')
        message.content = `&tabela pingi ${klucz}`

        mc(client, message)
        message.channel.send(':arrow_up: ' + klucz + ' :arrow_up:')
    }

    let turnieje = ['k3', 'tcp', 'wt', 'ps', 'pt', 'wk', 'vc', 'tdw']
    for(let klucz = 0; klucz < turnieje.length; klucz++){
        message.content = `&tabela pingi ${rok} ${turnieje[klucz]}`
        mc(client, message)
        message.channel.send(':arrow_up: ' + turnieje[klucz] + ' :arrow_up:')
    }
}

exports.name = "zzarchiwum";