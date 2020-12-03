module.exports = {
    name: 'Bot Channel',
    execute(client, message, args) {

        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;

        if (message.channel.type === "dm") return;

        if (message.author.bot) return;

        if (permissionLevel(message.member) >= 4) return;

        if (message.channel.id === "703168301634945097") return;

        if (!(message.content.startsWith(prefix))) return;

        message.delete();

        return message.channel.send(`${message.author}: **Please use the <#703168301634945097> channel for bot commands!**`).then(msg => msg.delete({ timeout: 5000 }));

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
            } else if (!helperRole && !moderatorRole && !administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};