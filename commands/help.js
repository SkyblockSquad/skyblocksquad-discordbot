module.exports = {
    name: 'help',
    description: 'See a list of all bot commands from a specific category!',
    category: 'Information',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;
        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

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

        var miscellaneousEmbed = new discord.MessageEmbed()
            .setTitle("HELP (MISCELLANEOUS)")
            .setDescription(`See a list of miscellaneous commands below! ${embedDescription}`)
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
        var miscellaneousAmount = 0;
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

            } else if (command["category"] == "Miscellaneous") {

                miscellaneousAmount++;
                miscellaneousEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);

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

        } else if (helpMenu === "miscellaneous" || helpMenu === "misc") {

            return message.channel.send(miscellaneousEmbed);

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
                    { name: ":information_source: __Information__", value: `*All commands that\ngive information!*\n**${informationAmount} Commands**`, inline: true },
                    { name: ":tada: __Fun & Games__", value: `*Play some cool games!*\n**${funAndGamesAmount} Commands**`, inline: true },
                    { name: "\u200b", value: "\u200b" },
                    { name: ":boomerang: __Hypixel__", value: `*Everything related to Hypixel\nand Hypixel Skyblock!*\n**${hypixelAmount} Commands**`, inline: true },
                    { name: ":jigsaw: __Miscellaneous__", value: `*Commands that don't belong\nin any other category!*\n**${miscellaneousAmount} Commands**`, inline: true },
                    { name: "\u200b", value: "\u200b" },
                    { name: ":microbe: __Covid-19__", value: `*All commands related to\nthe covid-19 virus! Wash\nyour hands!*\n**${covid19Amount} Commands**` }
                )

            return message.channel.send(helpMenuEmbed);

        }

    },
};