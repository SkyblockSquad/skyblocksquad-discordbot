module.exports = {
    name: 'help',
    description: 'help',
    execute(discord, message, prefix, embedColor, embedFooter, args) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments";
        var helpMenu = args.join(" ");

        if(args.length == 0) {

            var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setDescription(`See a list of bot commands below! ${embedDescription}\n\n**Use ,help [category] to see help about a specific category**`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "\u200b", value: "\u200b"},
                {name: `:information_source: __Infomation__`, value: "*Get alot of information!*\n**4 Commands**", inline: true},
                {name: `:tada: __Fun & Games__`, value: "*Play some fun games!*\n**3 Commands**", inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: `:microbe: __Covid-19__`, value: "*Eww! The covid-19 virus!*\n**1 Command**"}
            );

            return message.channel.send(botEmbed);

        } else if(args.length >= 1) {

            if(helpMenu === "information" || helpMenu === "info") {
                
                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (INFORMATION)")
                .setDescription(`See a list of information commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}help {category}`, value: "*See a list of all bot commands\n from a specific category!*", inline: true},
                    {name: `${prefix}me`, value: "*See some cool information about yourself!*", inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}info`, value: "*See information about\nthe server and the bot!*", inline: true},
                    {name: `${prefix}ping`, value: "*Get information about\nlatency and API ping!*", inline: true}
                );

                return message.channel.send(botEmbed);

            } else if(helpMenu === "fun & games" || helpMenu === "fun" || helpMenu === "games" || helpMenu === "fun and games") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (FUN & GAMES)")
                .setDescription(`See a list of fun & games commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}hack`, value: "*Hack the server!*", inline: true},
                    {name: `${prefix}is`, value: "*Ask some interesting\nquestions to the bot!*", inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}rps`, value: "*Duel the bot in a\nrock, paper, scissors game!*"}
                );

                return message.channel.send(botEmbed);

            } else if(helpMenu === "covid-19" || helpMenu === "covid" || helpMenu === "corona") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (COVID-19)")
                .setDescription(`See a list of covid-19 commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}covid (all | [country])`, value: "*See live covid-19 statistics!\nConfirmed cases, recovered people and deaths.*"},
                );

                return message.channel.send(botEmbed);

            }

            return message.channel.send(`**Error:** Invalid category! See a list of valid categorys using **${prefix}help**!`);

        } 
    
    },
};