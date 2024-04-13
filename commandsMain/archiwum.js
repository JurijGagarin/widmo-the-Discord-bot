const fs = require('fs')
const mc = require('../events/messageCreate.js')

exports.run = (client, message, argumenty) => {
    let dane = JSON.parse(fs.readFileSync('./databaseMain/bazaDanych.json'))
    let klucze = Object.keys(dane)
    rok = argumenty[0]

    let pozostałe = ['gp', 'druż', 'ind']
    function logArrayWithInterval3(index) {
        if (index < pozostałe.length) {
            klucz = pozostałe[index]
            message.reply(klucz)
            message.content = `&tabela s ${rok} ${klucz}`
            mc(client, message)
    
            setTimeout(() => {
            logArrayWithInterval3(index + 1);
            }, 10000);
        }
    }
    
    let turnieje = ['k3', 'tcp', 'wt', 'ps', 'pt', 'wk', 'vc', 'tdw']
    function logArrayWithInterval2(index) {
        if (index < turnieje.length) {
            klucz = turnieje[index]
            message.content = `&tabela żw ${rok} ${klucz}`
            mc(client, message)
    
            setTimeout(() => {
            logArrayWithInterval2(index + 1);
            }, 10000);
        }
        else logArrayWithInterval3(0)
    }

    function logArrayWithInterval(index) {
        if (index < klucze.length) {
            let klucz = klucze[index]
            if(klucz.startsWith(`${rok}`)){
                klucz = klucz.split(' ')
                if(!['mśwl', 'mś', 'io', 'bf'].includes(klucz[1])){
                    klucz[1] += '-' + klucz.pop()
                    klucz = klucz.join(' ')

                    message.content = `&tabela nicki-arch ${klucz}`
                    mc(client, message)
                }

                setTimeout(() => {
                logArrayWithInterval(index + 1);
                }, 10000);
            }
            else{
                logArrayWithInterval(index + 1)
            }
        }
        else logArrayWithInterval2(0);
    }

    logArrayWithInterval(0); 
}

exports.name = "archiwum";