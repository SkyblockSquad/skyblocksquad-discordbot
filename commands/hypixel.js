module.exports = {
    name: 'hypixel',
    description: 'hypixel',
    execute(message, args, discord, fetch, embedColor, embedFooter) {
    
        if(args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,hypixel {username}**!");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const data = await response.json().catch(error => {
                if(error.code === 50035) {
                    return message.channel.send("**Error:** Could not find data!")
                }
            });
            
            const { level } = data;
            const { karma} = data;
            const { rank} = data;

            var botEmbed = new discord.MessageEmbed()
            .setTitle(`HYPIXEL STATS (${args[0].toUpperCase()})`)
            .setDescription("See a players Hypixel stats below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Level", value: level, inline: true},
                {name: "Karma", value: karma, inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: "Rank", value: rank}
            );

            return message.channel.send(botEmbed);

        }

        getData();

    },
};