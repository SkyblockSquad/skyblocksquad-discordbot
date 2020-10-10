module.exports = {
    name: 'help',
    description: 'help',
    execute(discord, message, prefix, embedColor, embedFooter) {
        
        var botEmbed = new discord.MessageEmbed()
        .setTitle("HELP")
        .setDescription("See a list of bot commands below!\n[] means required » {} means optional")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addFields(
            {name: `${prefix}help`, value: "Display this list!"},
            {name: `${prefix}info#`, value: "Display bot and server info!"},
            {name: `${prefix}me`, value: "Display info about yourself!"},
            {name: `${prefix}hello`, value: "Say hello to the bot!"},
            {name: `${prefix}hack#`, value: "Hack the server!"},
            {name: `${prefix}is [player] [something]?#`, value: "Ask some questions to the bot!"},
            {name: "**INFORMATION**", value: "Commands with a # are not available in DM!"},

        );

        message.channel.send(botEmbed);

        return;
    },
};