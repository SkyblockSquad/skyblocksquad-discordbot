module.exports = {
    name: 'Letmessage Check',
    execute(client, message, args) {

        const fs = require("fs");
        const dataFile = require("../data/letmessageData.json");

        var userID = message.author.id;

        if (!(dataFile[userID])) return true;

        if (dataFile[userID].channelID !== message.channel.id) return true;

        dataFile[userID].usedAmount += 1;

        if (dataFile[userID].usedAmount >= dataFile[userID].totalAmount) {
            channel.permissionOverwrites.get(message.author.id).delete();
        }

    },
};