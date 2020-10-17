module.exports = {
    name: 'me',
    description: 'me',
    execute(discord, message, embedColor, embedFooter, moment) {

        var status = message.author.presence.status;

        var nickname = message.member.nickname;
        if(nickname == null || undefined) nickname = "None";

        var botEmbed = new discord.MessageEmbed()
        .setTitle("ME")
        .setDescription("See info about you below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({size: 4096}))
        .addFields(
            {name: "User Name", value:message.author.name},
            {name: "User ID", value:message.author.id},
            {name: "User Account Created", value: `${moment(message.author.createdAt).format("LL")}`},
            {name: "User Status", value:status},
            {name: "User NickName", value:nickname},
            {name: "User Game", value: `${message.author.presence.activities[0] ? message.author.presence.activities[0].name : "None"}`},
        );

        message.channel.send(botEmbed);
        return;

    },
};