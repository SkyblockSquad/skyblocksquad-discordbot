module.exports = {
    name: 'react',
    description: 'react',
    execute(message, args, discord, embedFooter, client) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission to do this!");

        if(args.length > 2 || args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,react [seconds] [amount]**! ");

        var timeInt = Number.parseInt(args[0], 10);
        timeInt *= 1000;

        var timeCheck = timeInt / 1;
        if(timeCheck != timeInt) return message.channel.send("**Error:** Invalid time! *(Not a number)*");

        if(timeInt < 3000) return message.channel.send("**Error:** Invalid time! Your time can't be less then 3 seconds!");
    
        var amountInt = Number.parseInt(args[1], 10);

        var amountCheck = amountInt / 1;
        if(amountCheck != amountInt) return message.channel.send("**Error:** Invalid amount! *(Not a number)*");

        if(amountInt < 1) return message.channel.send("**Error:** Invalid amount! Your amount can't be less then 1!");

        var reactionEmbed = new discord.MessageEmbed()
        .setTitle("REACT!")
        .setDescription(`React on this message!\n\n**Time:** ${args[0]} seconds\n**Amount of reactions:** ${args[1]}`)
        .setColor("00BFFF")
        .setFooter(embedFooter)

        var editedEmbed = new discord.MessageEmbed()
            .setTitle("REACT!")
            .setDescription("This reaction game has expired!")
            .setColor("00BFFF")
            .setFooter(embedFooter)

        var resultsEmbed = new discord.MessageEmbed()
            .setTitle("RESULTS!")
            .setDescription("Loading description...")
            .setColor("00BFFF")
            .setFooter(embedFooter)

        async function sendEmbed() {
            var embed = await message.channel.send(reactionEmbed);
            embed.react("☑️");

            const filter = (reaction, user) => {
                return reaction.emoji.name === "☑️" && !user.bot;
            };
    
            embed.awaitReactions(filter, { max: amountInt, time: timeInt, errors: ["time"] })
                .then(collected => {
                    if(collected.size > 1) {
                        resultsEmbed.setDescription(`**HOORAY!** We got **${collected.size}** reactions!`);
                    } else if(collected.size == 1) {
                        resultsEmbed.setDescription("**POG!** We got **1** reaction!");
                    }

                    embed.edit(editedEmbed);

                    var reactionUsers = embed.reactions.cache.get("☑️").users.cache.array();

                    for(let i = 0; i < reactionUsers.length; i++) {
                        if(reactionUsers[i].id == client.user.id) {
                            reactionUsers.splice(i,1);
                            continue;
                        }
                    }

                    if(reactionUsers.length == 0) {
                        var usersString = "None";
                    } else {
                        var usersString = reactionUsers.join(", ");
                    }

                    resultsEmbed.addField("Users:", usersString)
                    message.channel.send(resultsEmbed);

                })

                .catch(collected => {
                    if(collected.size > 0) {
                        resultsEmbed.setDescription(`**RIP!** We only got **${collected.size}/${args[1]}** reactions!`);
                    } else if(collected.size == 0) {
                        resultsEmbed.setDescription("**BIG OOF!** We got no reactions! :frowning2:");
                    }

                    embed.edit(editedEmbed);

                    var reactionUsers = embed.reactions.cache.get("☑️").users.cache.array();

                    for(let i = 0; i < reactionUsers.length; i++) {
                        if(reactionUsers[i].id == client.user.id) {
                            reactionUsers.splice(i,1);
                            continue;
                        }
                    }

                    if(reactionUsers.length == 0) {
                        var usersString = "None";
                    } else {
                        var usersString = reactionUsers.join(", ");
                    }

                    resultsEmbed.addField("Users:", usersString)
                    message.channel.send(resultsEmbed);

                });

        }

        sendEmbed();

    },
};