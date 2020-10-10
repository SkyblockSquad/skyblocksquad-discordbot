module.exports = {
    name: 'info',
    description: 'info',
    execute(discord, message, embedColor, embedFooter, client) {

        if(message.channel.type == "dm") {

            message.channel.send("**Error:** This command can not be used in DM!")
            return;

        }

        var botEmbed = new discord.MessageEmbed()
        .setTitle("INFO")
        .setDescription("See some usefull information below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()

        botEmbed.addFields(
            {name: "Server Name", value:message.guild.name},
            {name: "Server Member Count", value:message.guild.memberCounter},
            {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
            {name: "Server Created At", value:message.guild.createdAt},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime}
        );            

        message.channel.send(botEmbed);

        return;

    },
};