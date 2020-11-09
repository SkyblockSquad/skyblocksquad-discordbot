module.exports = {
    name: 'me',
    description: 'me',
    execute(message, args, discord, embedColor, embedFooter, moment) {

        if(args.length > 0) return message.channel.send("**Error:** You don't need to provide arguments!");

        var user = message.member;

        var status = user.presence.status;

        var nickName = user.nickname;
        if(nickName == null || undefined) nickName = "None";

        var accountCreated = moment(user.createdAt).format("LL");
        
        var joinedGuild = moment(user.joinedAt).format("LL");

        var game = user.presence.activities[0] ? user.presence.activities[0].name : "None";

        var botEmbed = new discord.MessageEmbed()
        .setTitle(`USER INFO`)
        .setDescription(`See info about ${user.username} below!`)
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({size: 4096}))
        .addFields(
            {name: "User Name", value: user.username, inline: true},
            {name: "User ID", value: user.id, inline: true},
            {name: "User Account Created", value: accountCreated, inline: true},
            {name: "\u200b", value: "\u200b"},
            {name: "User Status", value: status, inline: true},
            {name: "User Game", value: game, inline: true},
            {name: "User Nickname", value: nickName, inline: true},
            {name: "\u200b", value: "\u200b"},
            {name: "User Joined Server At", value: joinedGuild}
        );

        return message.channel.send(botEmbed);

    },
};