// discord.js, botConfig, node-fetch, moment, fs
const discord = require("discord.js");

const botConfig = require("./data/botconfig.json");
console.log("Data file \"botconfig.json\" has been loaded!")

const fetch = require("node-fetch");
const moment = require("moment");
const fs = require("fs");

var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
console.log("Succesfully loaded the file \"swearWords.json\"!")

// Setup variables
var prefix = botConfig.prefix;
var embedColor = botConfig.embedColor;
var embedFooter = botConfig.embedFooter;

// Login the bot
const client = new discord.Client();
client.login(process.env.token);
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`Command file "${command.name}.js" has been loaded.`);

}

console.log(`${commandFiles.length} command files have been loaded.`);

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
    client.user.setActivity(",help | If you need help!", {type: "PLAYING"});

});

// Server detection
client.on("message", async message => {

    if(message.channel.type == "text") {
        if(!(message.channel.guild.id == "683205054681055233") && !(message.channel.guild.id == "698797204701184060")) {

            if(message.author.bot) return;
            
            message.channel.send("**Hey! This is not the SkyblockSquad Discord server! All functions have been disabled.**");
            console.log(`The bot has been detected on an unknown server. Guild name: ${message.guild.name} | Guild owner: ${message.guild.owner}`);
            return;
        }
    }

    if(message.author.bot) return;

    // Anti-swear system
    var msg = message.content.toLowerCase();

    for (let i = 0; i < swearWords["swearWords"].length; i++) {
        if(msg.includes(swearWords["swearWords"][i])) {
    
            if(message.channel.type === "dm") return;
    
            message.delete();
            message.channel.send(`<@${message.author.id}>: **Please don't swear!**`).then(msg => msg.delete({timeout: 10000}));
            return;
    
        }
    }

    // Check channel
    if(!(message.channel.id == "703168301634945097")) {
        if(!(message.channel.id == "703185069354778725")) {

            if(!(message.content.startsWith(`${prefix}`))) return;
            
            if(!(message.member.hasPermission("ADMINISTRATOR"))) {
                
                var msg = "**Error:** Please use the <#703168301634945097> channel for bot commands!";
                message.channel.send(`**Error:** Please use the <#703168301634945097> channel for bot commands!`).then(msg => msg.delete({timeout: 10000}));
                message.delete();
                
                return;
            }

        }
    }

    var args = message.content.split(" ");
    var command = args[0]

    if(command === `${prefix}help`) {
        client.commands.get("help").execute(discord, message, prefix, embedColor, embedFooter);
    }

    if(command === `${prefix}info`) {
        client.commands.get("info").execute(discord, message, embedColor, embedFooter, client);         
    }

    if(command === `${prefix}me`) {
        client.commands.get("me").execute(discord, message, embedColor, embedFooter, moment);
    }

    if(command === `${prefix}hack`) {
       client.commands.get("hack").execute(discord, message, embedColor, embedFooter, args);
    }

    if(command === `${prefix}is`) {
        client.commands.get("is").execute(message, args);
    }

    if(command === `${prefix}covid`) {
        client.commands.get("covid").execute(discord, message, embedColor, embedFooter, args, fetch);
    }

    if(command === `${prefix}rps`) {
        client.commands.get("rps").execute(message, args);
    }

    if(command === `${prefix}say`) {
        client.commands.get("say").execute(message, args);
    }

});