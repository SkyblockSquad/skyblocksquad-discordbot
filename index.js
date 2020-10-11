// Setup discord.js and botconfig.json
const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fetch = require("node-fetch");

// Register fs
const fs = require("fs");

// Setup variables
var prefix = botConfig.prefix;
var embedColor = "#ed2121";
var embedFooter = "SkyblockSquad Bot | Made for SkyblockSquad Discord";

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

console.log(`${commandFiles.length} command files have been loaded.`)

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
    client.user.setActivity(",help | SkyblockSquad Bot", {type: "PLAYING"});

});

// Bot commands
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

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
    var msg = message.content.toLowerCase();

    for (let i = 0; i < swearWords["swearWords"].length; i++) {
        if(msg.includes(swearWords["swearWords"][i])) {

            if(message.channel.type === "dm") return;

            message.delete();
            message.channel.send(`<@${message.author.id}>: **Please don't swear!**`).then(msg => msg.delete({timeout: 10000}));
            return;
            
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
        client.commands.get("me").execute(discord, message, embedColor, embedFooter);
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
 
});