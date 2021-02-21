module.exports = {
    name: 'staffcommands',
    description: 'See a list of all staff commands! (Staff Only)',
    category: 'Information',
    aliases: ['scmds'],
    execute(client, message, args, isCommand) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;
        var embedFooter = botConfig.embedFooter;
        var embedColor = botConfig.embedColor;

        var embedDescription = "\n\n[] = required / {} = optional / () = multiple possible arguments";

        var staffEmbed = new discord.MessageEmbed()
            .setTitle("HELP (STAFF)")
            .setDescription(`See a list of staff commands below! ${embedDescription}`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()

        var commandList = [];

        if(permissionLevel(message.member) < 2) return message.channel.send("**Error:** You need to be staff to do this!");

        if (args.length > 0) return message.channel.send("**Error:** No arguments need to be provided!");

        if (message.channel.parentID !== "698851446501933076" && message.channel.parentID !== "766677533210968114") return message.channel.send("**Error:** Please use this command in a staff channel!");

        client.commands.forEach(command => {

            var constructor = {

                name: command.name,
                description: command.description,
                category: command.category

            }

            commandList.push(constructor);

        });

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Staff") {
                staffEmbed.addField(`${prefix}${command["name"]}`, `${command["description"]}`);
            }

        }

        return message.channel.send(staffEmbed);

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