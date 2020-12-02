module.exports = {
    name: 'Mute Check',
    execute(client, message, args) {

        if (message.channel.type === "dm") return;

        if (message.author.bot) return;

        var roleInServer = message.guild.roles.cache.get("703187997822025738");

        if (!(roleInServer)) return console.log("Oops! Couldn't find the Muted role!");

        var roleInUser = message.member.roles.cache.has("703187997822025738");

        if (!roleInUser) return;

        if(permissionLevel(message.member) < 4) message.delete();

        function permissionLevel(member) {

            var helperRole = message.member.roles.cache.has("683206050048114728");
            var moderatorRole = message.member.roles.cache.has("683205888034603042");
            var administratorRole = message.member.roles.cache.has("683205637001183365");
            var guildMasterRole = message.member.roles.cache.has("683205412488478809");

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