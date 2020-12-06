module.exports = {
    name: 'Christmas Roles',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        if (message.author.bot) return true;

        const discord = require("discord.js");

        var snowmanChance = randomChance(5);
        var santaChance = randomChance(5);
        var iceWizardChance = randomChance(1);
        var yetiChance = randomChance(1);

        var snowmanChance2 = randomChance(5);
        var santaChance2 = randomChance(5);
        var iceWizardChance2 = randomChance(1);
        var yetiChance2 = randomChance(1);

        var roleEmbed = new discord.MessageEmbed()
            .setTitle("CHRISTMAS EVENT")
            .setDescription(`${message.author}: **GG!** You got a new Christmas Role!`)
            .setColor("#dd2929")
            .setTimestamp()

        if (snowmanChance && snowmanChance2) {
            var hasSnowman = message.member.roles.cache.has("785071592412807180");
            if (!(hasSnowman)) {
                message.member.roles.add(message.guild.roles.cache.get("785071592412807180"));
                roleEmbed.addField("Role", "COMMON! <@&785071592412807180>");
                message.channel.send(roleEmbed);
            }
        } else if (santaChance && santaChance2) {
            var hasSanta = message.member.roles.cache.has("785071932117876736");
            if (!(hasSanta)) {
                message.member.roles.add(message.guild.roles.cache.get("785071932117876736"));
                roleEmbed.addField("Role", "RARE! <@&785071932117876736>");
                message.channel.send(roleEmbed);
            }
        } else if (iceWizardChance && iceWizardChance2) {
            var hasIceWizard = message.member.roles.cache.has("785072139882463252");
            if (!(hasIceWizard)) {
                message.member.roles.add(message.guild.roles.cache.get("785072139882463252"));
                roleEmbed.addField("Role", "LEGENDARY! <@&785072139882463252>");
                message.channel.send(roleEmbed);
            }
        } else if (yetiChance && yetiChance2) {
            var hasYeti = message.member.roles.cache.has("785072273295933442");
            if (!(hasYeti)) {
                message.member.roles.add(message.guild.roles.cache.get("785072273295933442"));
                roleEmbed.addField("Role", "MYTHIC! <@&785072273295933442>");
                message.channel.send(roleEmbed);
            }
        }

        return true;

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

    },
};