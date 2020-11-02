module.exports = {
    name: 'slowmode',
    description: 'slowmode',
    execute(message, args) {
    
        if(!(message.member.hasPermission("MANAGE_CHANNELS"))) return message.channel.send("**Error:** You don't have permission! **(MANAGE_CHANNELS)**");

        if(args.length < 1 || args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,slowmode [duration]**");

        var slowmode = parseInt(args[0]);
        if(!((slowmode / slowmode) === 0)) return message.channel.send(`**Error:** ${args[0]} is not a number!`);

        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send("**Succes!** The slowmode has been changed! :stopwatch:");

    },
};