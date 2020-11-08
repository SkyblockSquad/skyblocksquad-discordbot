const { Channel } = require("discord.js");

module.exports = {
    name: 'application',
    description: 'application',
    execute(message, args, discord, embedFooter) {
    
        var categoryID = "774903762447630367";

        var ticketUser = message.guild.member(message.mentions.users.first());

        if (message.channel.parentID !== categoryID) return message.channel.send("**Error:** You must be in an application ticket to do this!");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Error:** You don't have permission to do this!");

        if (!ticketUser) return message.channel.send("**Error:** Couldn't find that user!");

        var choiceEmbed = new discord.MessageEmbed()
            .setTitle("MANAGE APPLICATION")
            .setColor("00BFFF")
            .addField("Accepted:", "☑️", false)
            .addField("Rejected:", "❌", false);

         var reasonEmbed = new discord.MessageEmbed()
            .setTitle("MANAGE APPLICATION")
            .setColor("00BFFF")
            .addField("Reason:", "Please enter a reason.", false)

        const filter = m => m.content;

        message.channel.send(choiceEmbed).then(async msg => {

            message.delete();

            var emoji = await promptMessage(msg, message.author, 60, ["☑️", "❌"]);

            if(emoji === "☑️") {
                
                message.channel.send(reasonEmbed).then(msg => msg.delete({ timeout: 30000}));

                message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {

                    var reason = collected.first();
                    
                    var result = new discord.MessageEmbed()
                        .setTitle("ACCEPTED")
                        .setColor("00BFFF")
                        .addField("User:", `${ticketUser}`, false)
                        .addField("Reason:", `${reason}`, false)

                    message.channel.bulkDelete(3);
                    message.channel.send(result);
                    message.channel.setTopic(`**User:** ${ticketUser} **Status:** Accepted`);

                })

            } else if(emoji === "❌") {

                message.channel.send(reasonEmbed).then(msg => msg.delete({ timeout: 30000}));

                message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {

                var reason = collected.first();
                    
                var result = new discord.MessageEmbed()
                    .setTitle("REJECTED")
                    .setColor("00BFFF")
                    .addField("User:", `${ticketUser}`, false)
                    .addField("Reason:", `${reason}`, false)

                message.channel.bulkDelete(3);
                message.channel.send(result);
                message.channel.setTopic(`**User:** ${ticketUser} **Status:** Rejected`);

                })

            }

        })

        async function promptMessage(message, author, time, reactions) {

            time *= 1000;

            for (const reaction of reactions) {
                await message.react(reaction);
            }

            const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

            return message.awaitReactions(filter, { max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

        }

    },
};