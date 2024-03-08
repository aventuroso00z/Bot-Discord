const { Client, Collection } = require("discord.js");
const client = new Client();
require('discord-buttons')(client);
const chalk = require("chalk");
const fs = require("fs");
const { Message, MessageEmbed } = require('discord.js');

client.commands = new Collection();

fs.readdir(__dirname + "/bot/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/bot/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

client.on('message' , msg => {
 if(msg.content === "Nesesito alianza")
 msg.channel.send("Hola claro habla con @cazador para hacer alianza") 
});

client.on("message",message =>{
if(message.content.startsWith("Aboutme",)){
  const Discord = require("discord.js");
let userm = message.mentions.users.first()
const aC = new Discord.MessageEmbed()
.addField("๑˚⊹ Hola! Soy Mashiro el bot oficial del servidor `🩰` ","ଘ ʕ•ᴥ•ʔ੭ ___Estamos muy felices de verte por aqui___  ⊹˚₊")
.setDescription("୨୧ Cualquier queja o duda favor de abrir ticket 💌")
     .setColor("6CC3FF")
     .setThumbnail("https://images-ext-2.discordapp.net/external/2Ag-bmMEQf1PcSbVgI29q1YwhiQ_0YnoSL4QzKhNhsk/https/cdn.discordapp.com/emojis/964646110285152296.gif",)
    .setFooter('꒰꒰˚₊ ︵︵ 🌸')
    .setTimestamp();
    message.channel.send(aC);
      }
    });

client.on('message' , msg => {
 if(msg.content === "comoabroshop?")
 msg.channel.send("Hola creas una shop con el comando !createshop (Canal donde quieres que la chica cree la shop)   (rol que administre el canal aparte de la )") 
});

client.on("message",message =>{
if(message.content.startsWith("como creo una shop",)){
  const Discord = require("discord.js");
let userm = message.mentions.users.first()
const embed = new Discord.MessageEmbed()
.addField("๑ ₊˚<a:1a_BunnyEar_nyacho:1014595773821894687> ꒰ • Crea tu shop! • ദ <a:1b_BunnyEar_nyacho:1014595764414066759>  ˖˚˳⊹","୨୧ : Para crear una shop usa el comando !createshop + canal de tu ticket + rol de administrador ɞ ˚˳⊹")
     .setColor("6CC3FF")
     .setThumbnail("https://64.media.tumblr.com/9e8d0ee555396927a377cc32e3b4dcfa/38e2081fbb4c3cac-d9/s500x750/85e56835e713471ea1c1a5114fe307621e04206c.gif",)
    message.channel.send(embed);
      }
    });


client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)));

// Servidor HTTP para mantener el bot en línea
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(8080);
