module.exports = {
    name: 'Flex Slowmode',
    execute(client, message, args) {

        const fs = require("fs");
        const dataFile = require("../data/slowmodeData.json");

        if (message.author.bot) return true;
        if (message.channel.type === "dm") return true;

        if (!(message.channel.id === "687702496482689062")) return true;

        var userID = message.author.id;
        var canContinue = true;

        if (!(dataFile[userID])) {
            dataFile[userID] = {
                messages: 0
            }
        }

        if (dataFile[userID].messages >= 3) {

            if (permissionLevel(message.member) < 3) {
                
                message.delete();
                message.channel.send(`<@${message.author.id}>: **You can only send 3 messages in <#687702496482689062> every 30 minutes!**`).then(msg => msg.delete({ timeout: 5000 }));

                canContinue = false;
            }

        } else {
            dataFile[userID].messages += 1;
        }

        fs.writeFile("../data/slowmodeData.json", JSON.stringify(dataFile), err => {

        });

        if (canContinue) {
            setTimeout(function () {

                dataFile[userID].messages -= 1;
                fs.writeFile("../data/slowmodeData.json", JSON.stringify(dataFile), err => {

                });

            }, 1800000)
        }

        return canContinue;

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