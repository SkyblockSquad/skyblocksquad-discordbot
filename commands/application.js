module.exports = {
    name: 'application',
    description: 'application',
    execute(message, discord) {
    
        var categoryID = "774903762447630367";

        var ticketUser = message.guild.member(message.mentions.users.first());

        if (message.channel.parentID !== categoryID) return message.channel.send("**Error:** You must be in an application ticket to do this!");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Error:** You don't have permission to do this!");

        if (!ticketUser) return message.channel.send("**Error:** Couldn't find that user!");

        var choiceEmbed = new discord.MessageEmbed()
            .setTitle("MANAGE APPLICATION")
            .setColor("00BFFF")
            .addField("Accepted:", "☑️", false)
            .addField("Rejected:", "❌", false)
            .addField("Archive application:", "📥", false)

         var reasonEmbed = new discord.MessageEmbed()
            .setTitle("MANAGE APPLICATION")
            .setColor("00BFFF")
            .addField("Reason:", "Please enter a reason.", false)

        var dmEnabled = new discord.MessageEmbed()
            .setTitle("SUCCES!")
            .setColor("00BFFF")
            .setDescription(`I have succesfully sent a DM to ${ticketUser}!`)

        var dmDisabled = new discord.MessageEmbed()
            .setTitle("ERROR!")
            .setColor("00BFFF")
            .setDescription(`Couldn't send a DM to ${ticketUser} because they have private messages disabled!`)

        const filter = m => m.content;

        message.channel.send(choiceEmbed).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 120, ["☑️", "❌", "📥"]);

            if(emoji === "☑️") {
                
                message.channel.send(reasonEmbed);

                message.channel.awaitMessages(filter, {max: 1, time: 300000}).then(collected => {

                    var reason = collected.first();

                    if(reason == undefined) reason = "No reason supplied!";

                    reason = reason.toString();

                    if(reason.length > 1024) {
                        var plainMessage = "true";
                    } else {
                        var plainMessage = "false";
                    }
                    
                    var result = new discord.MessageEmbed()
                        .setTitle("ACCEPTED")
                        .setColor("00BFFF")
                        .addField("User:", `${ticketUser}`, false)

                        if(plainMessage === "false") {
                            result.addField("Reason:", `${reason}`, false)
                        }

                        result.addField("Accepted by:", `<@${message.author.id}>`, false)

                    message.channel.bulkDelete(3);
                    message.channel.send(result);

                    var dm = new discord.MessageEmbed()
                        .setTitle("ACCEPTED")
                        .setColor("00BFFF")
                        .setDescription("Your Helper application has been accepted!")
                        .addField("Accepted by:", `<@${message.author.id}>`, false)

                        if(plainMessage === "false") {
                            dm.addField("Reason:", `${reason}`, false)
                        }

                    ticketUser.send(dm).then(() => {

                        if(plainMessage === "true") ticketUser.send(`**Reason:** ${reason}`);

                        message.channel.send(dmEnabled);
                    }).catch(() => {
                        message.channel.send(dmDisabled);
                    })

                })

            } else if(emoji === "❌") {

                message.channel.send(reasonEmbed);

                message.channel.awaitMessages(filter, {max: 1, time: 300000}).then(collected => {

                var reason = collected.first();

                if(reason == undefined) reason = "No reason supplied!";

                reason = reason.toString();

                if(reason.length > 1024) {
                    var plainMessage = "true";
                } else {
                    var plainMessage = "false";
                }
                    
                var result = new discord.MessageEmbed()
                    .setTitle("REJECTED")
                    .setColor("00BFFF")
                    .addField("User:", `${ticketUser}`, false)

                    if(plainMessage === "false") {
                        result.addField("Reason:", `${reason}`, false)
                    }

                    result.addField("Rejected by:", `<@${message.author.id}>`, false)

                message.channel.bulkDelete(3);
                message.channel.send(result);

                var dm = new discord.MessageEmbed()
                    .setTitle("REJECTED")
                    .setColor("00BFFF")
                    .setDescription("Your Helper application has been rejected!")
                    .addField("Rejected by:", `<@${message.author.id}>`, false)

                    if(plainMessage === "false") {
                        dm.addField("Reason:", `${reason}`, false)
                    } 

                ticketUser.send(dm).then(() => {

                    if(plainMessage === "true") ticketUser.send(`**Reason:** ${reason}`);

                    message.channel.send(dmEnabled)
                }).catch(() => {
                    message.channel.send(dmDisabled);
                })

                })

            } else if(emoji === "📥") {

                var archivedCategory = "775289725710893056";

                message.channel.setParent(archivedCategory);

                message.channel.bulkDelete(1);

                var channelName = message.channel.name;

                channelName = channelName.slice(12, channelName.length);
                channelName = "archived-" + channelName.toString();

                var foundChannels = 0;

                message.guild.channels.cache.forEach(channel => {

                    if(channel.name === channelName.toLowerCase()) {
                        foundChannels++;
                    }

                });

                if(foundChannels > 0) {
                    channelName = channelName + foundChannels;
                }

                message.channel.setName(channelName.toLowerCase());

                var archived = new discord.MessageEmbed()
                    .setTitle("ARCHIVED APPLICATION")
                    .setColor("00BFFF")
                    .setDescription(":inbox_tray: Succesfully archived this application! :inbox_tray:")

                message.channel.send(archived);

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