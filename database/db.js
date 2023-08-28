const fs = require('fs')

exports.get = (key) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    return dane[key]
}

exports.mget = (keys) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    let zwrot = []
    keys.forEach(element => {
        zwrot.push(dane[element])
    });
    return zwrot
}

exports.set = (key, value, channel) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    dane[key] = value
    fs.writeFileSync('./database/bazaDanych.json', JSON.stringify(dane))
    if(typeof channel != 'undefined') channel.send(`pomyślńe ustawiono "${key}"`)
}
  
exports.del = (key, channel) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    var bool = typeof dane[key] != 'undefined'
    delete dane[key]
    fs.writeFileSync('./database/bazaDanych.json', JSON.stringify(dane))
    if(typeof channel != 'undefined' && bool) channel.send(`konQrs "${key}" został poddany egzeQcji natychmiast`)
}

exports.list = (prefix) => {
    let dane = JSON.parse(fs.readFileSync('./database/bazaDanych.json'))
    let keys = Object.keys(dane)
    if(prefix == '') return keys
    else return keys.filter((i) => {return i.startsWith(prefix)})
}