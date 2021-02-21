module.exports = {
    name: 'poll',
    description: 'Create a poll! (Admin+)',
    category: 'Staff',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission!");

        var content = message.content;

        if (content.endsWith("-a")) {
            var anonymous = "True";
            content = content.slice(0, content.length - 3);
        } else var anonymous = "False";

        if (content.endsWith("-p")) {
            var ping = "True";
            content = content.slice(0, content.length - 3);
        } else var ping = "False";

        if (anonymous === "False") {
            if (content.endsWith("-a")) {
                var anonymous = "True";
                content = content.slice(0, content.length - 3)
            } else var anonymous = "False";
        }

        content = content.split(" / ");

        var options = content;

        var booleanPoll = false;

        if (options.length === 3) {
            if (options[1].toLowerCase() === "yes" && options[2].toLowerCase() === "no") {
                booleanPoll = true;
            }
        }

        if (!(booleanPoll)) var reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
        if (booleanPoll) var reactions = ["✅", "❌"];

        if (options.length < 3 || options.length > 11) return message.channel.send("**Error:** Invalid syntax! Please use **,poll [question] / [option 1] / [option 2] / {option 3}... {-a} {-p}**\n*Minimum 2 options - Maximum 10 options*\n*Add -a to create an anonymous poll*\n*Add -p to ping*");

        var question = options[0];
        question = question.slice(6, question.length);
        options.shift();

        var botEmbed = new discord.MessageEmbed()
            .setTitle("POLL")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addField("Question", `The question is: **${question}**`)

        if (anonymous === "False") botEmbed.setDescription(`This poll was started by: <@${message.author.id}>`);
        if (ping === "True") message.channel.send("<@&772859858688802818>");

        for (let i = 0; i < options.length; i++) {

            const element = options[i];

            botEmbed.addField(`Option ${(i + 1).toString()}`, element);
        }

        async function sendPoll() {

            const poll = await message.channel.send(botEmbed);

            for (let i = 0; i < options.length; i++) {

                poll.react(reactions[i]);

            }

        }

        sendPoll();

        message.delete();

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
            } else if (!helperRole && !moderatorRole && administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};