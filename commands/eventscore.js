module.exports = {
    name: 'eventscore',
    description: 'See your score in the Christmas Event!',
    category: 'Miscellaneous',
    execute(client, message, args) {

        if (args.length > 0) return message.channel.send("**Error:** No arguments need to be provided!");

        const eventData = require("../data/christmasEvent.json");

        message.channel.send("**Calculating score...**");

        var roleList = eventData.roles;

        var score = calculateEventScore(roleList, message.member);

        return message.channel.send(`**Your score is:** ${score}`);

        function calculateEventScore(roles, member) {

            var score = 0;

            for (let i = 0; i < roles.length; i = i + 4) {

                var roleID = roles[i];
                var roleRarity = roles[i + 3];

                var hasRole = member.roles.cache.has(roleID);

                if (hasRole) {
                    if (!(roleRarity === "GODLY")) {
                        score++
                    } else {
                        score = score + 2;
                    }
                }

            }

            return score;

        }

    },
};