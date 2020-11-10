module.exports = {
    name: 'slowmode',
    description: 'slowmode',
    execute(message, args) {
    
        if(!(message.member.hasPermission("MANAGE_CHANNELS"))) return message.channel.send("**Error:** You don't have permission! **(MANAGE_CHANNELS)**");

        if(args.length < 1 || args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,slowmode [duration]**");

        var slowmode = args[0];
        
        var allowedSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        if(slowmode.endsWith("m")) {
            var multiplier = 60;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else if(slowmode.endsWith("h")) {
            var multiplier = 3600;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else {
            var multiplier = 1;
        }

        var symbols = slowmode.split("");

        for (let i = 0; i < symbols.length; i++) {
                message.channel.send(symbols[i]);
            for (let index = 0; index < allowedSymbols.length; index++) {
                    message.channel.send(allowedSymbols[index]);
                if(symbols[i] === allowedSymbols[index]) {
                    symbols.shift();
                }
            } 
        }

        if(symbols.length > 0) return message.channel.send("**Error:** That is not a valid number!")

        slowmode = parseInt(slowmode, 10);
        slowmode *= multiplier;

        if(slowmode > 21600) return message.channel.send("**Error:** You can't set slowmode higher then **6 hours**!");

        message.channel.setRateLimitPerUser(slowmode);
        message.channel.send("**Succes!** The slowmode has been changed! :stopwatch:");

    },
};