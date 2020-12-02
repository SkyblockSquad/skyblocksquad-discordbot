module.exports = {
    name: 'info',
    description: '*See information about the server and the bot!*',
    category: 'Information',
    execute(client, message, args) {

        const discord = require("discord.js");
        const moment = require("moment");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        if (args.length > 0) return message.channel.send("**Error:** No arguments need to be provided!");

        var botEmbed = new discord.MessageEmbed()
            .setTitle("INFO")
            .setDescription("See some usefull information below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        botEmbed.addFields(
            { name: "Server Name", value: message.guild.name },
            { name: "Server Member Count", value: message.guild.memberCount },
            { name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})` },
            { name: "Server Created At", value: `${moment(message.guild.createdAt).format("LL")}` },
            { name: "Bot Embed Color", value: embedColor },
            { name: "Bot Uptime", value: client.uptime }
        );

        return message.channel.send(botEmbed);

    },
};