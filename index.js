// Setup
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Variables
var prefix = botConfig.prefix;

// Login bot
const client = new discord.Client();
client.login(process.env.token);

// Console log & set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity(",help", {type: "PLAYING"});

});

// Bot commands
client.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    var messageArray = message.content.split(" ");
    var command = messageArray[0]

    if(command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("COMMAND HELP")
            .setDescription("Still work in progress...")
            .setColor("#ed2121")

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("SERVER INFO")
            .setColor("#ed2121")
            .addFields(
                {name: "Server Name", value:message.guild.name},
                {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
                {name: "Server Member Count", value:message.guild.memberCount}
            );

            return message.channel.send(botEmbed);
    }

});

// DM messages
client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle("OOPS...")
            .setDescription("For a list of commands type \",help\" in a server channel for a list of commands!")
            .setColor("#ed2121")

        return message.channel.send(botEmbed);
    }

});