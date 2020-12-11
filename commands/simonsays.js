module.exports = {
    name: 'ss',
    description: 'The main command for Simon Says!',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;

        var helpEmbed = new discord.MessageEmbed()
            .setTitle("SIMON SAYS")
            .setDescription("See a list of Simon Says commands below!")
            .setColor(botConfig.embedColor)
            .setFooter(botConfig.embedFooter)
            .addFields(
                { name: `**${prefix}ss startevent**`, value: "Start a new Simon Says event!" }
            )

        if (args.length < 1) return message.channel.send(helpEmbed);

        if (args[0].toLowerCase() === "startevent") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(ssChannel)) return message.channel.send("**Error:** Couldn't find the Simon Says channel!");

            // ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Verified"), {
            //     SEND_MESSAGES: false,
            //     VIEW_CHANNEL: true,
            //     READ_MESSAGE_HISTORY: true
            // });

            ssChannel.send(`Starting new **Simon Says** event in **5 minutes**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

            setTimeout(function () {
                ssChannel.send(`Starting new **Simon Says** event in **1 minute**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

                setTimeout(function () {
                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "SS: Participant"), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "SS: Eliminated"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    ssChannel.channel.send(`**Simon Says** event has started! You can now talk!`);
                    
                }, 60000)
            }, 240000)


            eventPrompt(ssChannel);

        }

        function permissionLevel(member) {

            var helperRole = member.roles.cache.has("683206050048114728");
            var moderatorRole = member.roles.cache.has("683205888034603042");
            var administratorRole = member.roles.cache.has("683205637001183365");
            var guildMasterRole = member.roles.cache.has("683205412488478809");

            if (!helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 1;
            } else if (helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 2;
            } else if (!helperRole && moderatorRole && !administratorRole && !guildMasterRole) {
                return 3;
            } else if (!helperRole && !moderatorRole && administratorRole && !guildMasterRole) {
                return 4;
            } else if (!helperRole && !moderatorRole && !administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};