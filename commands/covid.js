module.exports = {
    name: 'covid',
    description: 'covid',
    execute(discord, message, embedColor, embedFooter, args, fetch) {

        var argsWithoutCommand = args.shift();
        let countries = argsWithoutCommand.join(" ");

        if(args.length <= 1) {
            message.channel.send("**Error:** Invalid syntax! Please use **,covid all** OR **,covid [country]**");
            return;
        }
        
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
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                var botEmbed = new discord.MessageEmbed()
                .setTitle(`COVID (${countries})`)
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
            }).catch(e => {
                message.channel.send("**Error:** Invalid country provided!");
                return;
            })
        }
    },
};