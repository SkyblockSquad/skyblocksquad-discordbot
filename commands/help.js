module.exports = {
    name: 'help',
    description: 'help',
    execute(discord, message, prefix, embedColor, embedFooter) {
        
        var botEmbed = new discord.MessageEmbed()
        .setTitle("HELP")
        .setDescription("See a list of bot commands below!\n\n[] means required » {} means optional\nCommands marked with a # are only available in DM!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addFields(
            {name: `${prefix}help`, value: "Display this list!"},
            {name: `${prefix}info#`, value: "Display some usefull information!!"},
            {name: `${prefix}me`, value: "Display some usefull information about you!"},
            {name: `${prefix}hack#`, value: "Hack the server!"},
            {name: `${prefix}is [player] [argument 1] [argment 2]...?#`, value: "Ask anything you want to the bot!\n\n**Minimum 2 arguments - No maximum arguments**"}
        );

        message.channel.send(botEmbed);
        return;
    },
};