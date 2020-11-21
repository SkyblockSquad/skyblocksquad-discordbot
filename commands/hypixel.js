module.exports = {
    name: 'hypixel',
    description: 'See your and other people\'s stats!',
    category: 'Hypixel',
    execute(message, args, discord, fetch, embedColor, embedFooter, moment) {

        if (args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,hypixel {username}**!");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const data = await response.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { level } = data;

            if (level == undefined) return message.channel.send("**Error:** Could not find data!");

            const { karma } = data;
            const { rank } = data;
            const { online } = data;
            const { achievement_points } = data;
            const { links } = data;
            const { first_login } = data;
            const { last_login } = data;
            const { rank_plus_color } = data;

            var rankDisplay = "";

            if (rank == null) rankDisplay = "Default";
            if (rank === "VIP_PLUS") rankDisplay = "VIP+";
            if (rank === "MVP_PLUS") rankDisplay = "MVP+";
            if (rank === "MVP_PLUS_PLUS") rankDisplay = "MVP++";
            if (rank === "YOUTUBER") rankDisplay = "YT";

            if (rankDisplay === "") rankDisplay = rank;

            var onlineDisplay = "";

            if (online == false) onlineDisplay = "No";
            if (online == true) onlineDisplay = "Yes";

            var linkedDiscord = links["DISCORD"];
            if (linkedDiscord == null) linkedDiscord = "None";

            var plusColor = rank_plus_color;

            if (plusColor === "&c") plusColor = "Red (Default)";
            if (plusColor === "&6") plusColor = "Gold";
            if (plusColor === "&a") plusColor = "Green";
            if (plusColor === "&e") plusColor = "Yellow";
            if (plusColor === "&d") plusColor = "Light Purple";
            if (plusColor === "&f") plusColor = "White";
            if (plusColor === "&9") plusColor = "Blue";
            if (plusColor === "&2") plusColor = "Dark Green";
            if (plusColor === "&4") plusColor = "Dark Red";
            if (plusColor === "&3") plusColor = "Dark Aqua";
            if (plusColor === "&5") plusColor = "Dark Purple";
            if (plusColor === "&7") plusColor = "Grey";
            if (plusColor === "&0") plusColor = "Black";

            if(!rankDisplay === "MVP+" && !rankDisplay === "MVP++") plusColor = "None";

            var botEmbed = new discord.MessageEmbed()
                .setTitle(`HYPIXEL STATS (${args[0].toUpperCase()})`)
                .setDescription("See a players Hypixel stats below!\n**Note:** Rank plus color is 'None' if\nthe player's rank isn't MVP+ or MVP++")
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    { name: "Level", value: level, inline: true },
                    { name: "Rank", value: rankDisplay, inline: true },
                    { name: "Rank Plus Color", value: plusColor, inline: true },
                    { name: "Online", value: onlineDisplay, inline: true },
                    { name: "Karma", value: karma, inline: true },
                    { name: "Achievement Points", value: achievement_points, inline: true },
                    { name: "Linked Discord", value: linkedDiscord, inline: true },
                    { name: "First Login", value: `${moment(first_login).format("MMMM Do YYYY, h:mm:ss a")}`, inline: true },
                    { name: "Last Login", value: `${moment(last_login).format("MMMM Do YYYY, h:mm:ss a")}`, inline: true }
                );

            return message.channel.send(botEmbed);

        }

        getData();

    },
};