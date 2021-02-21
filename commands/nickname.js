module.exports = {
    name: 'nickname',
    description: 'Change a user\'s nickname! (Mod+)',
    category: 'Staff',
    execute(client, message, args, isCommand) {

        if(permissionLevel(message.member) < 3) return message.channel.send("**Error:** You don't have permission to do this!");

        if(args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,nickname [user] [nickname]**");

        var target = message.guild.members.cache.get(message.mentions.users.first().id);

        if(!(target)) return message.channel.send("**Error:** Couldn't find that user!");

        var nickname = args.slice(1).join(" ");

        target.setNickname(nickname).then(() => {
            return message.channel.send(`Succesfully changed the nickname of **${target.user.username}** to **${nickname}**!`);
        }).catch(() => {
            return message.channel.send("**Error:** Oops! I don't have permission to do that!");
        });


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