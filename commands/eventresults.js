module.exports = {
    name: 'eventresults',
    description: 'Display the results of the Christmas Event!',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        if (!(message.author.id === "449910090225549312")) return;

        message.delete();

        setTimeout(function() {
            message.channel.send("**The Christmas Event has ended! The results will appear in 1 minute.**");

            setTimeout(function() {
                message.channel.send("Event results will appear in **30 seconds**!");

                setTimeout(function() {
                    var resultsEmbed = new discord.MessageEmbed()
                        .setTitle("CHRISTMAS EVENT RESULTS")
                        .setDescription("Below you can find the results for the Christmas Event!\n\n:first_place: - {score} - **{name}**\n:second_place: - {score} - **{name}**\n:third_place: - {score} - **{name}**")
                        .setColor(botConfig.embedColor)
                        .setFooter(botConfig.embedFooter)

                    message.channel.send(resultsEmbed);

                }, 30000);
            }, 30000)
        }, 3000);

    },
};