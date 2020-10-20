const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'hypixel',
    description: 'hypixel',
    execute(message, args, discord, fetch, embedColor, embedFooter) {
    
        if(args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,hypixel {username}**!");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const data = await response.json();
            const { level } = data;

            if(level == null || undefined) return message.channel.send("**Error:** Something went wrong! (Invalid username)");

            var botEmbed = new discord.MessageEmbed()
            .setTitle(`HYPIXEL STATS (${args[0].toUpperCase()}`)
            .setDescription("See a players Hypixel stats below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Level", value: level}
            );

            return message.channel.send(botEmbed);

        }

        getData();

    },
};