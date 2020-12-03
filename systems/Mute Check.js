module.exports = {
    name: 'Mute Check',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        if (message.author.bot) return true;

        var roleInServer = message.guild.roles.cache.get("703187997822025738");

        if (!(roleInServer)) {
            console.log("Oops! Couldn't find the Muted role!");
            return true;
        }

        var roleInUser = message.member.roles.cache.has("703187997822025738");

        if (!roleInUser) return true;

        if(permissionLevel(message.member) < 4) {
            message.delete();
            return false;
        }

        return true;

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