module.exports = {
    name: 'me',
    description: 'me',
    execute(discord, message, embedColor, embedFooter, moment) {

        var status = message.author.presence.status;

        var nickname = message.author.nickname;
        if(nickname == null || undefined) nickname = "None";

        var botEmbed = new discord.MessageEmbed()
        .setTitle("ME")
        .setDescription("See info about you below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addFields(
            {name: "User Name", value:message.author.name},
            {name: "User ID", value:message.author.id},
            {name: "User Joined Discord At", value:message.author.createdAt},
            {name: "User Status", value:status},
            {name: "User NickName", value:nickname}
        );

        message.channel.send(botEmbed);
        return;

    },
};