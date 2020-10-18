module.exports = {
    name: 'help',
    description: 'See a list of all bot commands!',
    category: 'Information',
    execute(discord, message, prefix, embedColor, embedFooter) {

        var botEmbed = new discord.MessageEmbed()
        .setTitle("HELP")
        .setDescription("See a list of bot commands below!\n\n[] = required / {} = optional / () = multiple possible arguments\nCommands marked with a # are not available in DM!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addFields(
            {name: "\u200b", "\u200b"},
            {name: `:information_source: __Infomation__`, value: "*Get alot of information!*\n**3 Commands**", inline: true},
            {name: `:tada: __Fun & Games__`, value: "*Play some fun games!*\n**3 Commands**", inline: true}
        );

        message.channel.send(botEmbed);
        return;
        
        var botEmbed = new discord.MessageEmbed()
        .setTitle("HELP")
        .setDescription("See a list of bot commands below!\n\n[] means required » {} means optional » () means multiple possible arguments\nCommands marked with a # are only available in DM!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addFields(
            {name: `${prefix}help`, value: "Display this list!"},
            {name: `${prefix}info#`, value: "Display some usefull information!!"},
            {name: `${prefix}me`, value: "Display some usefull information about you!"},
            {name: `${prefix}hack#`, value: "Hack the server!"},
            {name: `${prefix}is [player] [argument 1] [argment 2]...?#`, value: "Ask anything you want to the bot!\n\n*Minimum 2 arguments - No maximum arguments*"},
            {name: `${prefix}covid (all|[country])`, value: "Get information about the covid-19 virus!\n\n*Minimum 1 argument - Maximum 1 argument*"},
            {name: `${prefix}rps (rock|paper|scissors)`, value: "Play rock, paper, scissors with the bot!\n\n*Minimum 1 argument - Maximum 1 argument*"}
        );

        message.channel.send(botEmbed);
        return;
    },
};