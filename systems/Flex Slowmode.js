module.exports = {
    name: 'Flex Slowmode',
    description: '',
    execute(client, message, args) {

        const fs = require("fs");
        const dataFile = require("../data/slowmodeData.json");

        if (message.author.bot) return true;
        if (message.channel.type === "dm") return true;

        if (!(message.channel.id === "766907402658250752")) return true;

        var userID = message.author.id;
        var canContinue = true;

        if (!(dataFile[userID])) {
            dataFile[userID] = {
                messages: 0
            }
        }

        if (dataFile[userID].messages >= 3) {

            message.delete();
            message.channel.send(`<@${message.author.id}>: **You can only send 3 messages in <#687702496482689062> every 30 minutes!**`).then(msg => msg.delete({ timeout: 5000 }));

            canContinue = false;

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

            }, 10000)
        }

        // 1.800.000

        return canContinue;

    },
};