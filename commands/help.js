module.exports = {
    name: 'help',
    description: 'See a list of all bot commands!',
    category: 'Information',
    execute(discord, message, prefix, embedColor, embedFooter, args) {

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments\nCommands marked with a # are not available in DM!";

        var command = args.join(" ");
        var argsText = command.slice(6);
        var argsText = argsText.toLowerCase();

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

            if(argsText === "information" || argsText === "info") {
                
                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (INFORMATION)")
                .setDescription(`See a list of information commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}help {category}`, value: "*See a list of all bot commands\nor see a list of all bot\n commands from aspecific category*", inline: true},
                    {name: `${prefix}me`, value: "*See information about yourself!*", inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}info`, value: "*See information about the server and the bot!*"}
                );

                return message.channel.send(botEmbed);

            } else if(argsText === "fun & games" || argsText === "fun" || argsText === "games") {

                var botEmbed = new discord.MessageEmbed()
                .setTitle("HELP (FUN & GAMES)")
                .setDescription(`See a list of fun & games commands below! ${embedDescription}`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}hack`, value: "*Hack the server!*", inline: true},
                    {name: `${prefix}is`, value: "*Ask everything to the bot!*", inline: true},
                    {name: "\u200b", value: "\u200b"},
                    {name: `${prefix}rps`, value: "*Play rock, paper, scissors!*"}
                );

                return message.channel.send(botEmbed);

            }

            return message.channel.send(`**Error:** Invalid category! See a list of categorys using **${prefix}help**!`);

        } 
    
    },
};