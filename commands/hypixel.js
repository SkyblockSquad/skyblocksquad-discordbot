module.exports = {
    name: 'hypixel',
    description: 'hypixel',
    execute(message, args, discord, fetch, embedColor, embedFooter, moment) {
    
        if(args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,hypixel {username}**!");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const data = await response.json().catch(error => {
                    message.channel.send("**Error:** An error occurred!");
            });
            
            const { level } = data;
            const { karma} = data;
            const { rank} = data;
            const { online } = data;
            const { achievement_points } = data;
            const { links } = data;
            const { first_login } = data;
            const { last_login } = data;
            const { last_logout } = data;

            if(level == undefined) return message.channel.send("**Error:** Could not find data!");

            var rankDisplay = "";

            if(rank == null) rankDisplay = "Default";
            if(rank === "VIP_PLUS") rankDisplay = "VIP+";
            if(rank === "MVP_PLUS") rankDisplay = "MVP+";
            if(rank === "MVP_PLUS_PLUS") rankDisplay = "MVP++";

            if(rankDisplay === "") rankDisplay = rank;

            var onlineDisplay = "";

            if(online == false) onlineDisplay = "No";
            if(online == true) onlineDisplay = "Yes";

            var linkedDiscord = links["DISCORD"];
            if(linkedDiscord == null) linkedDiscord = "None";
            
            var botEmbed = new discord.MessageEmbed()
            .setTitle(`HYPIXEL STATS (${args[0].toUpperCase()})`)
            .setDescription("See a players Hypixel stats below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "Level", value: level, inline: true},
                {name: "Karma", value: karma, inline: true},
                {name: "Rank", value: rankDisplay, inline: true},
                {name: "Online", value: onlineDisplay, inline: true},
                {name: "Achievement Points", value: achievement_points, inline: true},
                {name: "Linked Discord", value: linkedDiscord, inline: true},
                {name: "First Login", value: `${moment(first_login).format("MMMM Do YYYY, h:mm:ss a")}`, inline: true},
                {name: "Last Login", value: `${moment(last_login).format("MMMM Do YYYY, h:mm:ss a")}`, inline: true},
                {name: "Last Logout", value: `${moment(last_logout).format("MMMM Do YYYY, h:mm:ss a")}`, inline: true}
            );

            return message.channel.send(botEmbed);

            }

            getData();

    },
};