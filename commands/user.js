module.exports = {
    name: 'user',
    description: 'user',
    execute(message, args) {
    
        if(args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,player {player name}**\n*If you don't specify a username, show your own stats*");

        var user = message.mentions.users.first();
        var userGuild = message.guild.members.cache.find(usr => user);

        if(!(userGuild)) return message.channel.send("**Error:** Oops! Something went wrong!");

    },
};