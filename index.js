// Setup
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Variables
var prefix = botConfig.prefix;
var embedColor = "#ed2121";

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

    var messageArray = message.content.split(" ");
    var command = messageArray[0]

    if(command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setColor(embedColor)
            .addFields(
                {name: `${prefix}help`, value: "Display this list"},
                {name: `${prefix}info`, value: "Display bot and server info"}
            )

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var embedTitle = "INFO";

        if(!(message.channel.type == "dm")) {

            var botEmbed = new discord.MessageEmbed()
            .setTitle(embedTitle)
            .setColor(embedColor)
            .addFields(
                {name: "Server Name", value:message.guild.name},
                {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
                {name: "Server Member Count", value:message.guild.memberCount},
            );            

        } else {

            var botEmbed = new discord.MessageEmbed()
                .setTitle(embedTitle)
                .setColor(embedColor)
        }

        botEmbed.addFields(
            {name: "Bot Prefix", value:prefix},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime},
            {name: "Test", value:client.user}
        );

            return message.channel.send(botEmbed);
    }

});