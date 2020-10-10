module.exports = {
    name: 'covid',
    description: 'covid',
    execute(discord, message, embedColor, embedFooter, args, fetch) {

        
        if(args[1] === "all") {
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
                    {name: "Confirmed Cases", value:confirmed},
                    {name: "Recovered", value:recovered},
                    {name: "Deaths", value:deaths}
                );

                message.channel.send(botEmbed);
                return;
            })
        }

    },
};