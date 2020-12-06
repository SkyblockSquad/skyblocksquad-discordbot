module.exports = {
    name: 'Invisible Characters',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedFooter = botConfig.embedFooter;

        if (message.content.includes("‎")) {

            message.delete();

            var logsChannel = message.guild.channels.cache.find(ch => ch.name === "bot-logs");

            if (!(logsChannel)) {
                console.log("Oops! Couldn't find a channel named \"bot-logs\"!");
                return true;
            }

            var invisCharEmbed = new discord.MessageEmbed()
                .setTitle("INVISIBLE CHARACTER FILTER")
                .setDescription(`${message.author} attempted to use invisible characters!`)
                .setColor("#FF0000")
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    { name: "Channel", value: message.channel },
                    { name: "Warn Command", value: `You can warn them using:\n**eli warn ${message.author.id} Using invisible characters characters (Rule X)**` }
                )

            logsChannel.send(invisCharEmbed);

            message.channel.send(`${message.author}: **Please don't use invisible characters!**`).then(msg => msg.delete({ timeout: 5000 })).catch();

            return false;

        }

    },
};