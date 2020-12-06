module.exports = {
    name: 'Swear Filter',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedFooter = botConfig.embedFooter;

        if (message.channel.type === "dm") return true;

        if (message.author.bot) return true;

        var swearWords = require("../data/swearWords.json");

        var swearCheck = message.content.toLowerCase();

        for (let i = 0; i < swearWords["swearWords"].length; i++) {

            if (swearCheck.includes(swearWords["swearWords"][i])/* || swearCheck.includes(swearWords["swearWords"][i].replace("a", "*")) || swearCheck.includes(swearWords["swearWords"][i].replace("e", "*")) || swearCheck.includes(swearWords["swearWords"][i].replace("i", "*")) || swearCheck.includes(swearWords["swearWords"][i].replace("o", "*")) || swearCheck.includes(swearWords["swearWords"][i].replace("u", "*"))*/) {

                message.delete();

                var logsChannel = message.guild.channels.cache.find(ch => ch.name === "bot-logs");

                if (!(logsChannel)) {
                    console.log("Oops! Couldn't find a channel named \"bot-logs\"!");
                    return true;
                }

                var swearEmbed = new discord.MessageEmbed()
                    .setTitle("SWEAR FILTER")
                    .setDescription(`${message.author} attempted to swear!`)
                    .setColor("#FF0000")
                    .setFooter(embedFooter)
                    .setTimestamp()
                    .addFields(
                        { name: "Message", value: message.content },
                        { name: "Channel", value: message.channel },
                        { name: "Warn Command", value: `You can warn them using:\n**eli warn ${message.author.id} Swearing (Rule IV)**` }
                    )

                logsChannel.send(swearEmbed);

                message.channel.send(`${message.author}: **Please don't use that kind of language!**`).then(msg => msg.delete({ timeout: 5000 })); // This might need to be moved above the if (!(logsChannel)) { to make sure it is always sent

                return false;

            }

        }

    },
};
