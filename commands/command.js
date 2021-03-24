module.exports = {
    name: 'command',
    description: 'View information about a command!',
    category: 'Information',
    aliases: ['cmd'],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        if (!(args.length === 1)) return message.channel.send("**Error:** Invalid syntax! Please use **,command [command name]**!");

        var command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0]));

        if (!(command)) return message.channel.send("**Error:** Couldn't find that command!");

        var name = command.name;
        var description = command.description;
        var category = command.category;


        if (!(command.aliases == undefined)) {
            var aliases = command.aliases.join(" ");
        } else {
            var alises = "None";
        }

        var embed = new discord.MessageEmbed()
            .setTitle(`COMMAND INFORMATION (${args[0].toLowerCase()})`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFiels(
                { name: "Command Name", value: name, inline: true },
                { name: "Command Category", value: category, inline: true },
                { name: "Command Description", value: description },
                { name: "Command Aliases", value: aliases }
            );

        message.channel.send(embed);

    },
};