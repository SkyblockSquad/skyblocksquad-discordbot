module.exports = {
    name: 'help',
    description: 'help',
    execute(discord, message, prefix, embedColor, embedFooter, args, menuData) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments";
        var helpMenu = args.join(" ");

        if(args.length == 0) {

            var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setDescription(`See a list of bot commands below! ${embedDescription}\n\n**Use ,help [category] to see help about a specific category**`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "\u200b", value: "\u200b"},
                {name: menuData.information["cName"], value: `${menuData.information["cDescription"]}\n**${menuData.information["cmdAmount"]} Commands**`, inline: true},
                {name: `:tada: __Fun & Games__`, value: "*Play some fun games!*\n**3 Commands**", inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: `:boomerang: __Hypixel__`, value: "*All Hypixel-related commands!*\n**2 Commands**", inline: true},
                {name: `:microbe: __Covid-19__`, value: "*Eww! The covid-19 virus!*\n**1 Command**", inline: true},
            );

            return message.channel.send(botEmbed);

        } else if(args.length >= 1) {

            if(helpMenu === "information" || helpMenu === "info") {
                
                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (INFORMATION)")
                .setDescription(`See a list of information commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}help {category}`, value: menuData.information["help"], inline: true},
                    {name: `${prefix}me`, value: menuData.information["me"], inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}info`, value: menuData.information["info"], inline: true},
                    {name: `${prefix}ping`, value: menuData.information["ping"], inline: true}
                );

                return message.channel.send(botEmbed);

            } else if(helpMenu === "fun & games" || helpMenu === "fun" || helpMenu === "games" || helpMenu === "fun and games") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (FUN & GAMES)")
                .setDescription(`See a list of fun & games commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}hack`, value: "*Hack the server!*", inline: true},
                    {name: `${prefix}is`, value: "*Ask some interesting\nquestions to the bot!*", inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}rps`, value: "*Duel the bot in a\nrock, paper, scissors game!*"}
                );

                return message.channel.send(botEmbed);

            } else if(helpMenu === "covid-19" || helpMenu === "covid" || helpMenu === "corona") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (COVID-19)")
                .setDescription(`See a list of covid-19 commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}covid (all | [country])`, value: "*See live covid-19 statistics!\nConfirmed cases, recovered\npeople and deaths.*"},
                );

                return message.channel.send(botEmbed);

            } else if(helpMenu === "hypixel" || helpMenu === "skyblock" || helpMenu === "sb") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (HYPIXEL)")
                .setDescription(`See a list of Hypixel commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}profile {username} {profile name}`, value: "*See your Skyblock profile ID!*", inline: true},
                    {name: `${prefix}hypixel {username}`, value: "*See your Hypixel stats!*", inline: true}
                );

                return message.channel.send(botEmbed);

            }

            return message.channel.send(`**Error:** Invalid category!`);

        } 
    
    },
};