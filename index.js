const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
require('dotenv').config()

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildEmojisAndStickers]
});


const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

let komendy = (folder) => {
  client[folder] = new Collection();
  const commands = fs.readdirSync(`./${folder}`).filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./${folder}/${file}`);
    client[folder].set(commandName, command);
  }
}

komendy('commandsBalls')
komendy('commandsFun')
komendy('commandsMain')

/*const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);
  client.commands.set(commandName, command);
}

const ballsCommands = fs.readdirSync("./ballsCommands").filter(file => file.endsWith(".js"));
for (const file of ballsCommands) {
  const commandName = file.split(".")[0];
  const command = require(`./ballsCommands/${file}`);
  client.commandsKulki.set(commandName, command);
}*/

client.login(process.env.token)