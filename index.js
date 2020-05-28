const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();
client.login(process.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity(",help", {type: "PLAYING"});

});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0]

    if(command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("COMMAND HELP")
            .setDescription("Still work in progress...")
            .setColor("#32c5e3")
            .setFooter("Bot made by UltraDeveloper");

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("SERVER INFO")
            .setColor("#32c5e3")
            .setFooter("Bot made by UltraDeveloper")
            .addFields(
                {name: "Server Name", value:message.guild.name}
            );

    }

});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") {
        
        var botEmbed = new discord.MessageEmbed()
            .setTitle("OOPS...")
            .setDescription("For a list of commands type \",help\" in a server channel for a list of commands!")
            .setColor("#32c5e3")
            .setFooter("Bot made by UltraDeveloper");

        return message.channel.send(botEmbed);
    }

});