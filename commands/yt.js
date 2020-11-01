module.exports = {
    name: 'yt',
    description: 'yt',
    execute(message, args) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission to do this!");
        
        if(args.length == 0 || args.length >= 2) return message.channel.send("**Error:** Invalid syntax! Please use **,yt [user name]**");

        var user = message.guild.members.cache.find(args[0]);

        if(!userGuild) return message.channel.send("**Error:** Could not find player!");

        user.roles.add(message.guild.roles.cache.find(role => role.name("Youtube")));
        message.channel.send(`**${args[0]}** is now a **Youtuber**!`);

    },
};