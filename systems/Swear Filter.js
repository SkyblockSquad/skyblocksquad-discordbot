module.exports = {
    name: 'Swear Filter',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedFooter = botConfig.embedFooter;

        if (message.channel.type === "dm") return;

        if (message.author.bot) return;

        var swearWords = require("../data/swearWords.json");

        var swearCheck = message.content.toLowerCase();

        for (let i = 0; i < swearWords["swearWords"].length; i++) {

            if (swearCheck.includes(swearWords["swearWords"][i])) {

                message.delete();

                var logsChannel = message.guild.channels.cache.find(ch => ch.name === "bot-logs");

                if (!(logsChannel)) return console.log("Oops! Couldn't find a channel named \"bot-logs\"!");

                var swearEmbed = new discord.MessageEmbed()
                    .setTitle("SWEAR FILTER")
                    .setDescription(`${message.author} attempted to swear!`)
                    .setColor("#FF0000")
                    .setFooter(embedFooter)
                    .setTimestamp()
                    .addFields(
                        { name: "Message", value: message.content },
                        { name: "Warn Command", value: `You can warn them using:\n**eli warn ${message.author.id} Swearing (Rule IV)` }
                    )

                logsChannel.send(swearEmbed);

                return message.channel.send(`${message.author}: **Please don't use that kind of language!**`).then(msg => msg.delete({ timeout: 5000 }));

            }

        }

    },
};