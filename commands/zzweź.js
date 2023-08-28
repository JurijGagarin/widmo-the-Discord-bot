const fs = require('fs')

exports.run = (client, message, argumenty) => {
  function splitStringGenerator(str, chunkSize) {
    const length = str.length;
    let start = 0;
  
    while (start < length) {
      message.channel.send('@' + str.slice(start, start + chunkSize));
      start += chunkSize;
    }
  }

  splitStringGenerator(fs.readFileSync('./database/bazaDanych.json'), 1990);
};

exports.name = "zzweź";