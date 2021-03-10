module.exports = {
    name: 'skyblock',
    description: 'See the Skyblock stats of a player!',
    category: 'Hypixel',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        if (!(args.length === 1)) return message.channel.send("**Error:** Invalid syntax! Please use **,skyblock [username]**!");

        async function getData() {

            const responseUUID = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const dataUUID = await responseUUID.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { uuid } = dataUUID;

            var playerUUID = uuid;

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${playerUUID}`);
            const data = await response.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { members } = data;

            var member = members[playerUUID];

            var attributes = member["attributes"];

            var health = attributes["health"];

            message.channel.send(`**DEBUG!** ${health.toLocaleString()}`);

        }

        getData();

    },
};