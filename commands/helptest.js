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

            }

        }

        if (helpMenu === "information" || helpMenu === "info") {

            return message.channel.send(informationEmbed);

        } else if (helpMenu === "fun & games" || helpMenu === "fun" || helpMenu === "games" || helpMenu === "fun and games") {

            return message.channel.send(funAndGamesEmbed);

        } else if (helpMenu === "hypixel") {

            return message.channel.send(hypixelEmbed);

        }

    },
};