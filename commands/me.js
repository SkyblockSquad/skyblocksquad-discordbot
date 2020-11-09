module.exports = {
    name: 'me',
    description: 'me',
    execute(message, args, discord, embedColor, embedFooter, moment) {

        if(args.length > 0) return message.channel.send("**Error:** You don't need to provide arguments!");

        var member = message.guild.member(message.member);

        var nickName = member.nickname;
        if(nickName == null || undefined) nickName = "None";

        var accountCreated = moment(message.member.user.createdAt).format("LL");
        
        var joinedGuild = moment(member.joinedAt).format("LL");

        var botEmbed = new discord.MessageEmbed()
        .setTitle(`USER INFO`)
        .setDescription(`See info about ${member.username} below!`)
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .setThumbnail(message.member.user.displayAvatarURL({size: 4096}))
        .addFields(
            {name: "User Name", value: member.username, inline: true},
            {name: "User ID", value: member.id, inline: true},
            {name: "User Account Created", value: accountCreated, inline: true},
            {name: "\u200b", value: "\u200b"},
            {name: "User Nickname", value: nickName, inline: true},
            {name: "User Joined Server At", value: joinedGuild, inline: true}
        );

        return message.channel.send(botEmbed);

    },
};