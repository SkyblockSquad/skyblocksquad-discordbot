module.exports = {
    name: 'Christmas Event',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;
        if (message.author.bot) return true;

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var roleList = ["785071592412807180", 20, 100, "COMMON",
            "785098460764045313", 10, 100, "RARE",
            "785071932117876736", 10, 100, "RARE",
            "785086927182757908", 5, 100, "EPIC",
            "785098208761610250", 10, 10, "LEGENDARY",
            "785072139882463252", 10, 10, "LEGENDARY",
            "785088313392365588", 10, 10, "MYTHIC",
            "785072273295933442", 10, 10, "MYTHIC",
            "786640522722017400", 10, 10, "MYTHIC",
            "785090640132046858", 10, 10, "GODLY"];

        eventRoles(roleList, message.member, message.channel);

        function randomInteger(minimum, maximum) {

            var random = Math.floor(Math.random() * maximum + 1);

            for (let i = 0; true; i++) {
                if (random < minimum) {
                    random = Math.floor(Math.random() * maximum + 1);
                } else {
                    break;
                }
            }

            return random;

        }

        // Requires function randomInteger
        function randomChance(percentage) {

            var calc = 100 / percentage;

            var random = randomInteger(1, Math.round(calc));

            if (random == 1) {
                return true;
            } else {
                return false;
            }

        }

        // Requires function randomChance
        function eventRoles(roles, member, channel) {

            for (let i = 0; i < roles.length; i = i + 4) {

                var roleID = roles[i];
                var roleChance1 = roles[i + 1];
                var roleChance2 = roles[i + 2];
                var roleRarity = roles[i + 3];

                var chance1 = randomChance(roleChance1);
                var chance2 = randomChance(roleChance2);

                var hasRole = member.roles.cache.has(roleID);

                if (!(hasRole) && chance1 && chance2) {

                    member.roles.add(roleID);

                    var roleEmbed = new discord.MessageEmbed()
                        .setTitle("EVENT ROLE")
                        .setDescription(`<@${member.id}>: **Congrats! You got a new event role!**`)
                        .setColor(botConfig.embedColor)
                        .setFooter(botConfig.embedFooter)
                        .setTimestamp()
                        .addField("Role", `**${roleRarity}!** <@&${roleID}>`)

                    channel.send(roleEmbed);

                }

            }

        }

        function calculateEventScore(roles, member) {

            var score = 0;

            for (let i = 0; i < roles.length; i = i + 4) {

                var roleID = roles[i];
                var roleRarity = roles[i + 3];

                var hasRole = member.roles.cache.has(roleID);

                if (!(roleRarity === "GODLY")) {
                    score++;
                } else {
                    score = score + 3;
                }

            }

            return score;

        }

    },
};