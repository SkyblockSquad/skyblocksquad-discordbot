module.exports = {
    name: 'Roles Event',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");
        const eventConfig = require("../data/eventConfig.json");
        const eventRoles = require("../data/eventRoles.json");
        const eventData = require("../data/eventData.json");

        const fs = require("fs");

        if (message.channel.type === "dm") return true;
        if (message.author.bot) return true;

        var allowedCategories = eventConfig.eventCategories;
        var canContinue = false;

        for (let i = 0; i < allowedCategories.length; i++) {
            var element = allowedCategories[i];

            if (message.channel.id === element) canContinue = true;

        }

        var userID = message.author.id;

        if (!(eventData[userID])) {
            eventData[userID] = {
                cooldownActive: 0
            }
        }

        fs.writeFile("../data/eventData.json", JSON.stringify(eventData), err => {

        });

        if (eventData[userID].cooldownActive === 1) return true;

        var rolesList = [];
        var oIterationCounter = 0;

        for (let o = 0; o < eventRoles["eventRoles"].length; o++) {

            oIterationCounter += 1;

            if (oIterationCounter === 1) {

                var roleID = eventRoles["eventRoles"][o + 1];
                var roleChance1 = eventRoles["eventRoles"][o + 2];
                var roleChance2 = eventRoles["eventRoles"][o + 3];
                var roleChance3 = eventRoles["eventRoles"][o + 4];

                var roleDataList = [roleID, roleChance1, roleChance2, roleChance3];

                for (let p = 0; p < roleDataList.length; p++) {
                    rolesList.push(roleDataList[p]);
                }

            } else if (oIterationCounter > 4) {
                oIterationCounter = 0;
            }

        }

        console.log(`DEBUG! Tier: ${eventTier(message, rolesList)}`);
        console.log(`DEBUG! Chances: ${roleChances(message, rolesList)}`);

        var eventActive = eventConfig.eventActive;

        if (!(eventActive) || !(canContinue)) return true;

        var chances = roleChances(message, rolesList);

        var isLucky1 = randomChance(chances[0]);
        var isLucky2 = randomChance(chances[1]);
        var isLucky3 = randomChance(chances[2]);

        if (isLucky1 && isLucky2 && isLucky3) {

            var eIterationCounter = 0;
            var currentTier = 0;

            // ID1, chance 1.1, chance 1.2, chance 1.3, ID2, chance 2.1, chance 2.2, chance 2.3, ...

            for (let e = 0; e < rolesList.length; e++) {

                eIterationCounter += 1;

                if (eIterationCounter === 1) {

                    currentTier += 1;

                    if (currentTier === eventTier(message, rolesList)) {

                        var currentID = rolesList[e];

                    } else if (currentTier === eventTier(message, rolesList) + 1) {

                        var nextID = rolesList[e];

                    }

                } else if (eIterationCounter > 3) {
                    eIterationCounter = 0;
                }

            }

            var oldTierRole = message.guild.roles.cache.get(currentID);
            var newTierRole = message.guild.roles.cache.get(nextID);

            message.member.roles.remove(oldTierRole);
            message.member.roles.add(newTierRole);

            var embed = new discord.MessageEmbed()
                .setTitle("TIER LEVEL UP!")
                .setDescription(`Congratulations! You are now **tier ${nextTier}**!\n\n**Note:** This is an event! All roles from this event will\nbe removed once the event ends. You might win rewards depending on your tier!`)
                .setColor(botConfig.embedColor)
                .setFooter(botConfig.embedFooter)

            if (eventConfig.sendEmbed) {
                message.channel.send(`<@${message.author.id}>`);
                message.channel.send(embed);
            }

            var cooldown = eventConfig.roleCooldown;

            eventData[userID].cooldownActive = 1;

            fs.writeFile("../data/eventData.json", JSON.stringify(eventData), err => {

            });

            setTimeout(function () {

                eventData[userID].cooldownActive = 0;

                fs.writeFile("../data/eventData.json", JSON.stringify(eventData), err => {

                });

            }, cooldown * 1000);

        }

        function eventTier(message, rolesList) {

            var yIterationCounter = 0;
            var currentTier = 0;

            var result = 0;


            for (let y = 0; y < rolesList.length; y++) {

                yIterationCounter += 1;

                if (yIterationCounter === 1) {

                    currentTier += 1;

                    var roleID = rolesList[y];
                    var memberRole = message.member.roles.cache.get(roleID);

                    if (memberRole) result = currentTier;

                } else if (yIterationCounter > 3) {
                    yIterationCounter = 0;
                }

            }

            return result;

        }

        function roleChances(message, rolesList) {

            var hIterationCounter = 0;
            var currentTier = 0;

            for (let h = 0; h < rolesList.length; h++) {

                hIterationCounter += 1;

                if (hIterationCounter === 1) {

                    currentTier += 1;

                    if (currentTier - 1 === eventTier(message, rolesList)) {

                        var chance1 = rolesList[h + 1];
                        var chance2 = rolesList[h + 2];
                        var chance3 = rolesList[h + 3];

                        var roleChances = [chance1, chance2, chance3];

                    }

                } else if (hIterationCounter > 3)
                    hIterationCounter = 0;
            }

            return roleChances;

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