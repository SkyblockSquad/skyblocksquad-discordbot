module.exports = {
    name: 'letmessage',
    description: 'Let players send a certain amount of messages in a channel! (Admin+)',
    category: 'Staff',
    aliases: ['lm'],
    execute(client, message, args) {

        const fs = require("fs");
        const dataFile = require("../data/letmessageData.json");

        if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

        if (args.length > 3 || args.length < 3) return message.channel.send("**Error:** Invalid syntax! Please use **,lm [user] [channel] [amount]**!");

        var user = message.mentions.users.first();
        var channel = message.mentions.channels.first();
        var amount = parseInt(args[2]);

        if (!(user)) return message.channel.send("**Error:** Please provide a valid user!");
        if (!(channel)) return message.channel.send("**Error:** Please provide a valid channel!");
        if (!(Number.isInteger(amount))) return message.channel.send("**Error:** Please provide a valid amount!");

        var userID = user.id;

        channel.updateOverwrite(userID, {
            SEND_MESSAGES: true,
            ATTACH_FILES: true
        });

        if (!(dataFile[userID])) {
            dataFile[userID] = {
                usedAmount: 0,
                totalAmount: amount
            }
        }

        fs.writeFile("../data/letmessageData.json", JSON.stringify(dataFile), err => {

        });

        message.channel.send(`**${user.user.name}** can now send **${amount}** in ${channel}!`);

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