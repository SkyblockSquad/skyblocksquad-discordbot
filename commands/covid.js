module.exports = {
    name: 'covid',
    description: 'See live covid-19 statistics! Confirmed cases, recovered people and deaths.',
    category: 'Covid-19',
    aliases: ['corona', 'covid-19'],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        let countries = args.join(" ");

        if (args.length >= 2 || !(args[0])) return message.channel.send("**Error:** Invalid syntax! Please use **,covid [(all | [country])]**!");

        if (args[0] === "all") {

            fetch("https://covid19.mathdro.id/api")
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle("COVID (WORLDWIDE)")
                        .setDescription("See stats about the covid-19 virus!")
                        .setColor(embedColor)
                        .setFooter(embedFooter)
                        .setTimestamp()
                        .addFields(
                            { name: "Confirmed Cases", value: confirmed },
                            { name: "Recovered", value: recovered },
                            { name: "Deaths", value: deaths }
                        );

                    return message.channel.send(botEmbed);

                })
        } else {

            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    var countriesUpper = countries.toUpperCase();

                    var botEmbed = new discord.MessageEmbed()
                        .setTitle(`COVID (${countriesUpper})`)
                        .setDescription("See stats about the covid-19 virus!")
                        .setColor(embedColor)
                        .setFooter(embedFooter)
                        .setTimestamp()
                        .addFields(
                            { name: "Confirmed Cases", value: confirmed },
                            { name: "Recovered", value: recovered },
                            { name: "Deaths", value: deaths }
                        );

                    message.channel.send(botEmbed);

                }).catch(e => {
                    return message.channel.send("**Error:** Invalid country provided!");
                })
        }
    },
};