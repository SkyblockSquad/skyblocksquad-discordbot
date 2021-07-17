module.exports = {
    name: 'skyblocksquad',
    description: 'Get stats about the SkyblockSquad guild!',
    category: 'Hypixel',
    aliases: ['sbs', 'guild'],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");
        const moment = require("moment");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/guilds/id/5dbe79ef8ea8c901c1f3a007`);
            const data = await response.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { level } = data;

            if (level == undefined) message.channel.send("**Error:** An error occurred!");

            const { exp } = data;

            const { tag } = data;
            const { tag_color } = data;

            var tagColorDisplay = "";

            if (tag_color === "&7") tagColorDisplay = "Gray";
            if (tag_color === "&3") tagColorDisplay = "Dark Aqua";
            if (tag_color === "&2") tagColorDisplay = "Dark Green";
            if (tag_color === "&e") tagColorDisplay = "Yellow";
            if (tag_color === "&6") tagColorDisplay = "Gold";

            var botEmbed = new discord.MessageEmbed()
                .setTitle(`SKYBLOCKSQUAD GUILD STATS`)
                .setDescription("See the SkyblockSquad guild's stats below!")
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    { name: "Guild Level", value: level, inline: true },
                    { name: "Guild EXP", value: exp.toLocaleString(), inline: true },
                    { name: "Guild Tag", value: `${tag} (${tagColorDisplay})`, inline: true }
                );

            return message.channel.send(botEmbed);

        }

        getData();

    },
};