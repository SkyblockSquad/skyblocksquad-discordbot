module.exports = {
    name: 'qotd',
    description: 'Create a new question of the day! (Admin+)',
    category: 'Staff',
    aliases: ['questionoftheday'],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        var cmdChannel = message.channel;

        if (permissionLevel(message.member) < 4) return cmdChannel.send("**Error:** You don't have permission!");

        var content = args.join(" ");

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

        if (options.length < 3 || options.length > 11) return cmdChannel.send("**Error:** Invalid syntax! Please use **,qotd [question] / [option 1] / [option 2] / {option 3}... **\n*Minimum 2 options - Maximum 10 options*");

        var question = options[0];
        options.shift();

        var botEmbed = new discord.MessageEmbed()
            .setTitle("QUESTION OF THE DAY")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addField("Question", `The question is: **${question}**`)

        message.channel.send("ping here") 

        for (let i = 0; i < options.length; i++) {

            const element = options[i];

            botEmbed.addField(`Option ${(i + 1).toString()}`, element);
        }

        async function sendPoll() {

            const poll = await cmdChannel.send(botEmbed);

            for (let i = 0; i < options.length; i++) {

                poll.react(reactions[i]);

            }

        }

        sendPoll();

        if (isCommand) message.delete();

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