module.exports = {
    name: 'help',
    description: 'See a list of all bot commands!',
    category: 'Information',
    execute(discord, message, prefix, embedColor, embedFooter, args) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments\nCommands marked with a # are not available in DM!";

        var command = args.join(" ");
        var argsText = command.slice(6);
        console.log(`DEBUG: ${argsText}`);

        if(args.length <= 1) {

            var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setDescription(`See a list of bot commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: "\u200b", value: "\u200b"},
                {name: `:information_source: __Infomation__`, value: "*Get alot of information!*\n**3 Commands**", inline: true},
                {name: `:tada: __Fun & Games__`, value: "*Play some fun games!*\n**3 Commands**", inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: `:microbe: __Covid-19__`, value: "*Eww! The covid-19 virus!*\n**1 Command**"}
            );

            message.channel.send(botEmbed);
            return;

        } else if(args.length >= 2) {

            if(args[1].toLowerCase() === "information" || args[1].toLowerCase() === "info") {
                
                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (INFORMATION)")
                .setDescription(`See a list of information commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}help {category}`, value: "*See a list of all bot commands\nor see a list of all bot commands from a\nspecific category*"}
                );

                return message.channel.send(botEmbed);

            } else if(args[1].toLowerCase() === "fun & games" || args[1].toLowerCase() === "fun" || args[1].toLowerCase() === "games") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (FUN & GAMES)")
                .setDescription(`See a list of fun & games commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}hack`, value: "*Hack the server!*"}
                );

                return message.channel.send(botEmbed);

            }

            return message.channel.send(`**Error:** Invalid category! See a list of categorys using **${prefix}help**!`);

        } 
    
    },
};