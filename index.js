// Setup discord.js and botconfig.json
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Setup variables
var prefix = botConfig.prefix;
var embedColor = "#ed2121";
var embedFooter = "SkyblockSquad Bot";

// Login the bot
const client = new discord.Client();
client.login(process.env.token);

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
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
            .setDescription("See a list of bot commands below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: `${prefix}help`, value: "Display this list!"},
                {name: `${prefix}info`, value: "Display bot and server info!"},
                {name: `${prefix}me`, value: "Display info about yourself!"},
                {name: `${prefix}stafflist`, value: "Displlay a list of staff!"},
                {name: `${prefix}hello`, value: "Say hello to the bot!"}
            )

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var botEmbed = new discord.MessageEmbed()
        .setTitle("INFO")
        .setDescription("See info about the bot below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()

        if(!(message.channel.type == "dm")) {

            botEmbed.addFields(
                {name: "Server Name", value:message.guild.name},
                {name: "Server Member Count", value:message.guild.memberCount},
                {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
                {name: "Server Channel", value:message.channel.name}
            );            

        }

        botEmbed.addFields(
            {name: "Bot Name", value:client.user},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime}
        );

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}me`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("ME")
            .setDescription("See info about you below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Your Username", value: `${message.author.username} (${message.author.username.length} characters)`},
                {name: "Your Tag", value:message.author.tag}
            );

            return message.channel.send(botEmbed);

    }

    if(command === `${prefix}hello`) {

        return message.channel.send(`Hello there, ${message.author.username}!`);

    }

    if(command === `${prefix}stafflist`) {

        let membersWithRole = message.guild.members.filter(member => { 
            return member.roles.find("name", "Owner");
        }).map(member => {
            return member.user.username;
        })

        var botEmbed = new discord.MessageEmbed()
            .setTitle("STAFF LIST")
            .setDescription("See a staff list below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Owner", value: membersWithRole.join("\n")}
            );

            return message.channel.send(botEmbed);

    }
 
});