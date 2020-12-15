module.exports = {
    name: 'spam',
    execute(client, message, args) {

        if (!(permissionLevel(message.member) >= 4)) return;

        if (args.length < 2) return;

        var amount = parseInt(args[0]);
        if (!(Number.isInteger(amount))) return;

        message.delete();

        var message = args.slice(1, args.length).join(" ");

        for (let i = 0; i < amount; i++) {
            message.channel.send(message);
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
            } else if (!helperRole && !moderatorRole && !administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};