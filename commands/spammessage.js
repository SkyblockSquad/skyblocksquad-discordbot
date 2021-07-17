module.exports = {
    name: 'spammessage',
    description: 'Spam a message a certain amount of times! (Admin+)',
    category: 'Staff',
    aliases: ['smsg'],
    execute(client, message, args, isCommand, channel) {

        if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

        if (args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,spammessage [amount] [message]**!");

        var amount = parseInt(args[0]);

        if (!(Number.isInteger(amount))) return message.channel.send("**Error:** Please provide a valid amount!");

        if (amount < 1) return message.channel.send("**Error:** Please provide an amount higher than 0!");
        
        message.delete();

        args.shift();

        var text = args.join(" ");

        for (let i = 0; i < amount; i++) {
            message.channel.send(text);
        }

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