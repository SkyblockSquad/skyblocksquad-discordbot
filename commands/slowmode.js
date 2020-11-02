module.exports = {
    name: 'slowmode',
    description: 'slowmode',
    execute(message, args) {

        function hasDecimal (num) {
            return !!(num % 1);
        }
    
        if(!(message.member.hasPermission("MANAGE_CHANNELS"))) return message.channel.send("**Error:** You don't have permission! **(MANAGE_CHANNELS)**");

        if(args.length < 1 || args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,slowmode [duration]**");

        var slowmode = args[0];

        if(slowmode.endsWith("m")) {
            var multiplier = 60;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else if(slowmode.endsWith("h")) {
            var multiplier = 3600;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else {
            var multiplier = 1;
        }

        slowmode = parseInt(slowmode);

        if(!(slowmode === 0)) {
            if(!((slowmode / slowmode) === 1)) return message.channel.send("**Error:** That is not a number!");
        }

        if(slowmode < 0) return message.channel.send("**Error:** You can't set a negative slowmode!");
        if(slowmode > 21600) return message.channel.send("**Error:** You can't set slowmode higher then **6 hours**!");
        if(hasDecimal(slowmode)) return message.channel.send("**Error:** You can't set a decimal slowmode!");

        slowmode *= multiplier;

        message.channel.setRateLimitPerUser(slowmode);
        message.channel.send("**Succes!** The slowmode has been changed! :stopwatch:");

    },
};