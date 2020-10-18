module.exports = {
    name: 'info',
    description: 'info',
    execute(discord, message, embedColor, embedFooter, client, args) {

        if(args.length >= 2) return message.channel.send("**Error:** No arguments need to be provided!");

        var botEmbed = new discord.MessageEmbed()
        .setTitle("INFO")
        .setDescription("See some usefull information below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()

        botEmbed.addFields(
            {name: "Server Name", value:message.guild.name},
            {name: "Server Member Count", value:message.guild.memberCount},
            {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
            {name: "Server Created At", value: `${moment(message.guild.createdAt).format("LL")}`},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime}
        );            

        return message.channel.send(botEmbed);

    },
};