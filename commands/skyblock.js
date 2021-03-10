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

        if (!(args.length === 2)) return message.channel.send("**Error:** Invalid syntax! Please use **,skyblock [(stats)] [username]**!");

        async function getData() {

            const responseUUID = await fetch(`https://api.slothpixel.me/api/players/${args[1]}`);
            const dataUUID = await responseUUID.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { uuid } = dataUUID;

            var playerUUID = uuid;

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${playerUUID}`);
            const data = await response.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            if (!(playerUUID)) return message.channel.send("**Error:** An error occurred!");

            const { members } = data;

            var member = members[playerUUID];

            if (args[0].toLowerCase() === "stats") {

                var attributes = member["attributes"];

                var health = attributes["health"];
                var defense = attributes["defense"];
                var strength = attributes["strength"];

                var embed = new discord.MessageEmbed()
                    .setTitle(`SKYBLOCK (STATS) ${args[1].toUpperCase()}`)
                    .setColor(embedColor)
                    .setFooter(embedFooter)
                    .setTimestamp()
                    .addFields(
                        { name: "Health", value: health, inline: true },
                        { name: "Defense", value: defense, inline: true },
                        { name: "Strength", value: strength, inline: true }
                    );

                message.channel.send(embed);

            } else {
                message.channel.send("**Error:** Unknown category! Please use one of the following: **stats**");
            }



        }

        getData();

    },
};