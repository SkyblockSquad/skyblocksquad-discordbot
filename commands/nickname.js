module.exports = {
    name: 'nickname',
    description: 'Set a user\'s nickname!',
    execute(client, message, args) {

        if(permissionLevel(message.member) < 3) return message.channel.send("**Error:** You don't have permission to do this!");

        if(args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,nickname [user] [nickname]**");

        var target = message.mentions.users.first();

        if(!(target)) return message.channel.send("**Error:** Couldn't find that user!");

        var oldNickname = target.nickname;
        var nickname = args.slice(1).join(" ");

        target.setNickname(nickname);

        return message.channel.send(`Succesfully changed the nickname of **${target.user.username}** from **${oldNickname}** to **${nickname}**!`);

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