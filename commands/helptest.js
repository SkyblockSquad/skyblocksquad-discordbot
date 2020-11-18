module.exports = {
    name: 'helptest',
    description: '*This description shows when to use the newline symbol!*',
    category: 'Information',
    execute(message, args, client, discord, embedColor, embedFooter, prefix) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments\n";
        var helpMenu = args.join(" ");

        var informationEmbed = new discord.MessageEmbed()
            .setTitle("HELP (INFORMATION)")
            .setDescription(`See a list of information commands below! ${embedDescription}`)
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

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Information") {

                informationAmount++;

                informationEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}\n`);

            }

        }

        if(helpMenu === "information" || helpMenu === "info") {
            return message.channel.send(informationEmbed);
        }

    },
};