module.exports = {
    name: 'Event Roles',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json")
        const eventRoles = require("../data/eventRoles.json");

        var embedFooter = botConfig.embedFooter;
        var embedColor = botConfig.embedColor

        if (message.channel.type === "dm") return true;
        if (message.author.bot) return true;

        if (!(message.channel.parentID === "683205203465601104") && !(message.channel.parentID === "683207849966436412")) return true;

        // Get all the tier roles
        var hasT1Role = message.member.roles.cache.get(eventRoles["tier1"][0]);
        var hasT2Role = message.member.roles.cache.get(eventRoles["tier2"][0]);
        var hasT3Role = message.member.roles.cache.get(eventRoles["tier3"][0]);
        var hasT4Role = message.member.roles.cache.get(eventRoles["tier4"][0]);
        var hasT5Role = message.member.roles.cache.get(eventRoles["tier5"][0]);

        var T1Role = message.guild.roles.cache.get(eventRoles["tier1"][0]);
        var T2Role = message.guild.roles.cache.get(eventRoles["tier2"][0]);
        var T3Role = message.guild.roles.cache.get(eventRoles["tier3"][0]);
        var T4Role = message.guild.roles.cache.get(eventRoles["tier4"][0]);
        var T5Role = message.guild.roles.cache.get(eventRoles["tier5"][0]);

        // Get the player's current tier
        var currentTier = 0

        if (hasT1Role) currentTier = 1;
        if (hasT2Role) currentTier = 2;
        if (hasT3Role) currentTier = 3;
        if (hasT4Role) currentTier = 4;
        if (hasT5Role) currentTier = 5;

        // If the player is tier 0, make them tier 1
        if (currentTier === 0) {
            message.member.roles.add(T1Role);
            currentTier = 1;
        }

        // Get the player's next tier
        var nextTier = currentTier + 1;

        // Get the player's levelup chances
        var nextTierChance1 = eventRoles[`tier${currentTier.toString()}`][1];
        var nextTierChance2 = eventRoles[`tier${currentTier.toString()}`][2];

        // Check if the player is lucky
        var isLucky1 = randomChance(nextTierChance1);
        var isLucky2 = randomChance(nextTierChance2);

        // If the player is lucky, level them up
        if (isLucky1 && isLucky2) {

            if (currentTier === 1) {
                message.member.roles.remove(T1Role);
                message.member.roles.add(T2Role);
            }

            if (currentTier === 2) {
                message.member.roles.remove(T2Role);
                message.member.roles.add(T3Role);
            }

            if (currentTier === 3) {
                message.member.roles.remove(T3Role);
                message.member.roles.add(T4Role);
            }

            if (currentTier === 4) {
                message.member.roles.remove(T4Role);
                message.member.roles.add(T5Role);
            }

            var nextTierEmbed = new discord.MessageEmbed()
                .setTitle("TIER LEVEL UP!")
                .setDescription(`Congratulations! You are now **tier ${nextTier}**!\n\n**Note:** This is an event! All roles from this event will\nbe removed once the event ends. You might win rewards depending on your tier!`)
                .setColor(embedColor)
                .setFooter(embedFooter)

            message.channel.send(`<@${message.author.id}>`);
            message.channel.send(nextTierEmbed);
            
        }

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