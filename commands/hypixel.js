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
            const { karma} = data;
            const { achievement_points } = data;
            const { rank} = data;

            if(level == null || undefined) return message.channel.send("**Error:** Something went wrong! (Invalid username)");

            if(rank == null) rank = "Default";
            if(rank == "VIP_PLUS") rank = "VIP+";
            if(rank == "MVP_PLUS") rank = "MVP+";
            if(rank == "MVP_PLUS_PLUS") rank = "MVP++";

            var botEmbed = new discord.MessageEmbed()
            .setTitle(`HYPIXEL STATS (${args[0].toUpperCase()}`)
            .setDescription("See a players Hypixel stats below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Level", value: level, inline: true},
                {name: "Karma", value: karma, inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: "Achievement Points", value: achievement_points, inline: true},
                {name: "Rank", value: rank, inline: true}
            );

            return message.channel.send(botEmbed);

        }

        getData();

    },
};