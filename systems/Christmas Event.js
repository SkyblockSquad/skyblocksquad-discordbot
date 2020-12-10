module.exports = {
    name: 'Christmas Event',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;
        if (message.author.bot) return true;

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");
        const eventData = require("../data/christmasEvent.json");

        var roleList = eventData.roles;

        var roleSettings = {
            allowMultiple: true,
            sendEmbed: true
        }

        eventRoles(roleList, roleSettings, message.member, message.channel);

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
        function eventRoles(roles, settings, member, channel) {

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

                    if (settings.sendEmbed == true) channel.send(roleEmbed);

                    if (settings.allowMultiple == false) break;

                }

            }

        }

    },
};