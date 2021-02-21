module.exports = {
    name: 'embed',
    description: 'Create a nice looking embed!',
    category: 'Miscellaneous',
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");

        var seperator = " / ";

        var seperatedArgs = args.join(" ").split(seperator);

        if (seperatedArgs.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,embed [title] / [description] / {color} / {footer} / {timestamp}**\n*Title and description is required, the rest isn't*\n*To provide a color, use hexadecimal, for example: #ff00b9,*\n*or a color's name, for example RED*\n*Type 'none' for an empty footer*\n*To set a timestamp, provide anything*");

        if (seperatedArgs.length > 5) return message.channel.send("**Error:** Too much arguments provided!");

        var title;
        var description;
        var color;
        var footer;
        var timestamp;

        if (seperatedArgs.length >= 2) {
            title = seperatedArgs[0];
            description = seperatedArgs[1];
        }

        if (seperatedArgs.length >= 3) {
            color = seperatedArgs[2];
        }

        if (seperatedArgs.length >= 4) {
            if(seperatedArgs[3].toLowerCase() !== "none") footer = seperatedArgs[3];
        }

        if (seperatedArgs.length == 5) {
            timestamp = seperatedArgs[4];
        }

        var createdEmbed = new discord.MessageEmbed()
            .setTitle(title)
            .setDescription(description);

        if(color !== undefined) {
            createdEmbed.setColor(color);
        }

        if(footer !== undefined) {
            createdEmbed.setFooter(footer);
        }

        if(timestamp !== undefined) createdEmbed.setTimestamp();

        message.channel.send(createdEmbed);

    },
};