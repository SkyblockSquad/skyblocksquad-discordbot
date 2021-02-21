module.exports = {
    name: 'info',
    description: 'See information about the bot!',
    category: 'Information',
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
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
            { name: "Bot Embed Color", value: embedColor },
            { name: "Bot Uptime", value: client.uptime }
        );

        return message.channel.send(botEmbed);

    },
};