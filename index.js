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
            .setTitle("BOT COMMAND HELP")
            .setDescription("Coming soon!")

            return message.channel.send(botEmbed);
    }

});