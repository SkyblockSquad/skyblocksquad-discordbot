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

        for (let o = 0; o < eventRoles["eventRoles"]; o++) {

            oIterationCounter += 1;

            if (oIterationCounter === 1) {

                var roleID = eventRoles["eventRoles"][o + 1];
                var roleChance1 = eventRoles["eventRoles"][o + 2];
                var roleChance2 = eventRoles["eventRoles"][o + 3];
                var roleChance3 = eventRoles["eventRoles"][o + 4];

                var roleDataList = [roleID, roleChance1, roleChance2, roleChance3];

                rolesList.push(roleDataList);

            } else if (oIterationCounter > 4) {
                oIterationCounter = 0;
            }

        }

        console.log(`Player's tier: ${eventTier(message)}`);

        function eventTier(message) {

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

    },
};