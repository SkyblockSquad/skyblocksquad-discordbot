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
                { name: `${prefix}ss enter`, value: "Enter a Simon Says event!" },
                { name: `${prefix}ss startevent`, value: "Start a new Simon Says event!" },
                { name: `${prefix}ss eliminate`, value: "Eliminate a player from the event!" }
            )

        if (args.length < 1) return message.channel.send(helpEmbed);

        if (args[0].toLowerCase() === "startevent") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(ssChannel)) return message.channel.send("**Error:** Couldn't find the Simon Says channel!");

            if (!(eventStatus(ssChannel) === "Inactive")) return message.channel.send("**Error:** There is already an event active!");

            // ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Verified"), {
            //     SEND_MESSAGES: false,
            //     VIEW_CHANNEL: true,
            //     READ_MESSAGE_HISTORY: true
            // });

            var startingTopic = updateStatus(ssChannel, "Starting");
            ssChannel.setTopic(startingTopic);

            ssChannel.setTopic("**DEBUG**");

            message.channel.send("**Succesfully started a new Simon Says event!**");

            ssChannel.send(`Starting a new **Simon Says** event in **5 minutes**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

            setTimeout(function () {
                ssChannel.send(`Starting a new **Simon Says** event in **1 minute**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

                setTimeout(function () {
                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "SS: Participant"), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Verified"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false,
                        READ_MESSAGE_HISTORY: false
                    });

                    var activeTopic = updateStatus(ssChannel, "Active");
                    ssChannel.setTopic(activeTopic);

                    ssChannel.send(`The **Simon Says** event has started! You can now talk!`);
                    ssChannel.send("[<@&787000309108965418>]")

                }, 60000)
            }, 240000)

        } else if (args[0].toLowerCase() === "enter") {

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(eventStatus(ssChannel) === "Starting")) return message.channel.send("**Error:** There is no Simon Says event active at the moment!");

            var hasEntered = message.member.roles.cache.has("787000309108965418");

            if (hasEntered) return message.channel.send("**Error:** You have already entered the Simon Says event!");

            message.member.roles.add(message.guild.roles.cache.get("787000309108965418"));

            var newTopic = updateRemaining(ssChannel, remainingUsers(ssChannel) + 1);
            ssChannel.setTopic(newTopic);

            message.channel.send("**You have succesfully entered the event!**");

        } else if (args[0].toLowerCase() === "eliminate" || args[0].toLowerCase() === "elim") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(eventStatus(ssChannel) === "Active")) return message.channel.send("**Error:** There is no Simon Says event active at the moment!");

            if (!(message.mentions.users.size > 0)) return message.channel.send("**Error:** Please provide a user.");

            if (message.mentions.users.size > 1) return message.channel.send("**Error:** Please only provide one user at a time.")

            var target = message.guild.members.cache.get(message.mentions.users.first().id);

            var targetIsAlive = target.roles.cache.has("787000309108965418");

            if (!(targetIsAlive)) return message.channel.send("**Error:** That person hasn't entered the event or is already dead!");

            target.roles.remove("787000309108965418");

            var newTopic = updateRemaining(ssChannel, remainingUsers(ssChannel) + 1);
            ssChannel.setTopic(newTopic);

            message.channel.send(`**${target.user.username}** has been eliminated!`);

        } else if (args[0].toLowerCase() === "revive") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(eventStatus(ssChannel) === "Active")) return message.channel.send("**Error:** There is no Simon Says event active at the moment!");

            if (!(message.mentions.users.size > 0)) return message.channel.send("**Error:** Please provide a user.");

            if (message.mentions.users.size > 1) return message.channel.send("**Error:** Please only provide one user at a time.")

            var target = message.guild.members.cache.get(message.mentions.users.first().id);

            var targetIsAlive = target.roles.cache.has("787000309108965418");

            if (targetIsAlive) return message.channel.send("**Error:** That person is already alive!");

            target.roles.add("787000309108965418");

            var newTopic = updateRemaining(ssChannel, remainingUsers(ssChannel) + 1);
            ssChannel.setTopic(newTopic);

            message.channel.send(`**${target.user.username}** has been revived!`);

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

        function eventStatus(channel) {

            var status = channel.topic.split(" ")[1];
            return status;

        }

        function remainingUsers(channel) {

            var remaining = channel.topic.split(" ")[3];
            return remaining;

        }

        function updateRemaining(channel, remaining) {

            var status = channel.topic.split(" ")[1];
            var generatedTopic = `**Status:** ${status} **Remaining:** ${remaining}`;

            return generatedTopic;

        }

        function updateStatus(channel, status) {

            var remaining = channel.topic.split(" ")[3];
            var generatedTopic = `**Status: ${status} **Remaining:** ${remaining}`

            return generatedTopic

        }

    },
};