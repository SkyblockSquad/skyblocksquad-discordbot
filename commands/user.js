module.exports = {
    name: 'user',
    description: 'user',
    execute(message, args, discord, embedColor, embedFooter, moment) {
    
        if(args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,player {player name}**\n*If you don't specify a username, show your own stats*");

        
        if(args.length !== 0) {
            
            var user = message.mentions.users.first();
            var userGuild = message.guild.members.cache.find(usr => user);

            if(!(userGuild)) return message.channel.send("**Error:** Oops! Something went wrong!");

        } else {
            var user = message.author;
        }

        var botEmbed = new discord.MessageEmbed()
        .setTitle(`USER ${member.username.toUpperCase()}`)
        .setDescription(`See info about ${member.username} below!`)
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({size: 4096}))
        .addFields(
            {name: "User Name", value:user.username, inline: true},
            {name: "User ID", value:user.id, inline: true},
            {name: "\u200b", value: "\u200b"},
            {name: "User Account Created", value: `${moment(user.createdAt).format("LL")}`, inline: true},
            {name: "User Status", value:user.presence.status, inline: true},
            {name: "User Game", value: `${user.presence.activities[0] ? user.presence.activities[0].name : "None"}`, inline: true},
        );

        return message.channel.send(botEmbed);

    },
};