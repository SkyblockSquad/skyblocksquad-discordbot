module.exports = {
    name: 'helptest',
    description: '*This description shows when to use the newline symbol!*',
    category: 'Information',
    execute(message, args, client, discord, embedColor, embedFooter, prefix) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments";
        var helpMenu = args.join(" ");

        var informationEmbed = new discord.MessageEmbed()
            .setTitle("HELP (INFORMATION)")
            .setDescription(`See a list of information commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        var funAndGamesEmbed = new discord.MessageEmbed()
            .setTitle("HELP (FUN & GAMES)")
            .setDescription(`See a list of fun & games commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        var hypixelEmbed = new discord.MessageEmbed()
            .setTitle("HELP (HYPIXEL)")
            .setDescription(`See a list of Hypixel commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        var covid19Embed = new discord.MessageEmbed()
            .setTitle("HELP (COVID-19)")
            .setDescription(`See a list of covid-19 commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        var commandList = [];

        client.commands.forEach(command => {

            var constructor = {

                name: command.name,
                description: command.description,
                category: command.category

            }

            commandList.push(constructor);



        });

        var informationAmount = 0;
        var funAndGamesAmount = 0;
        var hypixelAmount = 0;
        var covid19Amount = 0;

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Information") {

                informationAmount++;
                informationEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            } else if (command["category"] == "Fun & Games") {

                funAndGamesAmount++;
                funAndGamesEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            } else if (command["category"] == "Hypixel") {

                hypixelAmount++;
                hypixelEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            } else if (command["category"] == "Covid-19") {

                covid19Amount++;
                covid19Embed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

            }

        }

        if (helpMenu === "information" || helpMenu === "info") {

            return message.channel.send(informationEmbed);

        } else if (helpMenu === "fun & games" || helpMenu === "fun" || helpMenu === "games" || helpMenu === "fun and games") {

            return message.channel.send(funAndGamesEmbed);

        } else if (helpMenu === "hypixel") {

            return message.channel.send(hypixelEmbed);

        } else if (helpMenu === "covid-19" || helpMenu === "covid" || helpMenu === "corona") {

            return message.channel.send(covid19Embed);

        } else {

            var helpMenuEmbed = new discord.MessageEmbed()
                .setTitle("HELP")
                .setDescription(`See a list of command categorys below! ${embedDescription}\n\n**Use ,help [category] to see help about a specific category**`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    { name: "\u200b", value: "\u200b" },
                    { name: ":information_source: __Information__", value: `*All commands that give information!*\n**${informationAmount} Commands**`, inline: true },
                    { name: ":tada: __Fun & Games__", value: `*Play some cool games!*\n**${funAndGamesAmount} Commands**`, inline: true },
                    { name: "\u200b", value: "\u200b" },
                    { name: ":boomerang: __Hypixel__", value: `*Everything related to Hypixel!*\n**${hypixelAmount} Commands**`, inline: true },
                    { name: ":microbe: __Covid-19__", value: `*All commands related to\nthe covid-19 virus! Wash\nyour hands!*\n**${covid19Amount} Commands**`, inline: true }
                )

            return message.channel.send(helpMenuEmbed);

        }

    },
};