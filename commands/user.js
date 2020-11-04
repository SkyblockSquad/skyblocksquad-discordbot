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

        var nickname = user.nickname;
        if(nickname == null || undefined) nickname = "None";

        var botEmbed = new discord.MessageEmbed()
        .setTitle("ME")
        .setDescription("See info about you below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL({size: 4096}))
        .addFields(
            {name: "User Name", value:user.username},
            {name: "User ID", value:user.id},
            {name: "User Account Created", value: `${moment(user.createdAt).format("LL")}`},
            {name: "User Status", value:user.presence.status},
            {name: "User NickName", value:nickname},
            {name: "User Game", value: `${user.presence.activities[0] ? user.presence.activities[0].name : "None"}`},
        );

        return message.channel.send(botEmbed);

    },
};