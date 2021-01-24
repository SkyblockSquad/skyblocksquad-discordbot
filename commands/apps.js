module.exports = {
    name: 'apps',
    description: 'Open or close staff applications. (Admin+)',
    category: 'Staff',
    aliases: ['applications'],
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var staffManager = message.member.roles.cache.has("729202553870483498");
        var guildMaster = message.member.roles.cache.has("683205412488478809");
        var aArgs = args.join(" ");

        if (!staffManager && !guildMaster) return message.channel.send("**Error:** You don't have permission to do this!");

        if (aArgs.toLowerCase() === "open") {

            message.guild.me.roles.remove("786237532684681246");
            return message.channel.send("**Applications are now open!**");

        } else if (aArgs.toLowerCase() === "close") {

            message.guild.me.roles.add("786237532684681246");
            return message.channel.send("**Applications are now closed.**");

        }

        var embed = new discord.MessageEmbed()
            .setTitle("Application Management")
            .setDescription("You can manage applications with the below commands.")
            .setColor(botConfig.embedColor)
            .setFooter(botConfig.embedFooter)
            .setTimestamp()
            .addFields(
                { name: `**${botConfig.prefix}apps open**`, value: "Open staff applications" },
                { name: `**${botConfig.prefix}apps close**`, value: "Close staff applications" }
            );

        return message.channel.send(embed);

    },
};