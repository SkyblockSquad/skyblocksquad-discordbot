module.exports = {
    name: 'slowmode',
    description: 'Change a channel\'s slowmode (Admin+)!',
    category: 'Staff',
    aliases: ['sm'],
    execute(client, message, args, isCommand, channel) {

        if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission! **(MANAGE_CHANNELS)**");

        if (args.length < 1 || args.length > 1) return message.channel.send("**Error:** Invalid syntax! Please use **,slowmode [duration]**");

        var slowmode = args[0];

        if (slowmode.endsWith("m")) {
            var multiplier = 60;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else if (slowmode.endsWith("h")) {
            var multiplier = 3600;
            slowmode = slowmode.slice(0, slowmode.length - 1);
        } else {
            var multiplier = 1;
        }

        slowmode = parseInt(slowmode, 10);
        slowmode *= multiplier;

        if (!Number.isInteger(slowmode)) return message.channel.send("**Error:** That is not a valid number!");

        if (slowmode < 0) return message.channel.send("**Error:** You can't set a negative slowmode!");

        if (slowmode > 21600) return message.channel.send("**Error:** You can't set slowmode higher then **6 hours**!");

        message.channel.setRateLimitPerUser(slowmode);
        message.channel.send("**Succes!** The slowmode has been changed! :stopwatch:");

        function permissionLevel(member) {

            var helperRole = member.roles.cache.has("683206050048114728");
            var moderatorRole = member.roles.cache.has("683205888034603042");
            var administratorRole = member.roles.cache.has("683205637001183365");
            var guildMasterRole = member.roles.cache.has("683205412488478809");

            if (!helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 1;
            } else if (helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 2;
            } else if (!helperRole && moderatorRole && !administratorRole && !guildMasterRole) {
                return 3;
            } else if (!helperRole && !moderatorRole && administratorRole && !guildMasterRole) {
                return 4;
            } else if (!helperRole && !moderatorRole && administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};