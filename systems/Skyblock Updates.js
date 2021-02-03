module.exports = {
    name: 'Skyblock Updates',
    execute(client, message, args) {

        const fs = require("fs");
        const dataFile = require("../data/skyblockUpdates.json");

        if (message.channel.type === "dm") return true;

        if (!(message.webhookID)) return true;

        if (!(message.channel.id === "757218179113156669")) return true;

        if (message.content.includes("@SkyBlock Scoop") || message.content.includes("@SkyBlock News")) {
            var pingType = "updates";
        } else if (message.content.includes("@SkyBlock Leaks")) {
            var pingType = "leaks";
        } else {
            var pingType = "none";
        }

        dataFile[pingType].amount += 1;

        fs.writeFile("../data/skyblockUpdates.json", JSON.stringify(dataFile), err => {

        });

        if (dataFile[pingType].amount === 1) {

            if (pingType === "updates") var pingRole = "717993991773356145";
            if (pingType === "leaks") var pingRole = "770715385657950218";

            if (pingType !== "none") message.channel.send(`[<@&${pingRole}>]`);

        }

        setTimeout(function () {

            dataFile[pingType].amount -= 1;

            fs.writeFile("../data/skyblockUpdates.json", JSON.stringify(dataFile), err => {

            });

        }, 180000);

    },
};