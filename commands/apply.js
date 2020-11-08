module.exports = {
    name: 'apply',
    description: 'apply',
    execute(message, discord, embedFooter) {
    
        var categoryID = "774903762447630367";
        var author = message.author;

        var channelName = "application-" + author.username;

        var ticket = false;

        message.guild.channels.cache.forEach(channel => {

            if(channel.name.toLowerCase() === channelName.toLowerCase()) {;
                ticket = true;
                return message.channel.send("**Error:** You already started an application!");
            }
        });

        if(ticket) return;

        message.delete();

        var embed = new discord.MessageEmbed()
            .setTitle("CREATING CHANNEL...")
            .setDescription("Please wait while I create your application ticket...")
            .setColor("00BFFF")
            .setFooter(embedFooter);

        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));

        message.guild.channels.create(channelName, {type: "text"}).then(
            (createdChannel) => {
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false,
                            READ_MESSAGE_HISTORY: false
                        });

                        settedParent.updateOverwrite(author.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGES: true,
                            ATTACH_FILES: true,
                            ADD_REACTIONS: false,
                            CONNECT: false,
                            READ_MESSAGE_HISTORY: true
                        });

                        var information = new discord.MessageEmbed()
                            .setTitle("WELCOME TO YOUR TICKET!")
                            .setDescription("This is your ticket. Before answering the questions, make sure that you agree with everything in the #applications channel!")
                            .setColor("00BFFF");

                        var question1 = new discord.MessageEmbed()
                            .setTitle("QUESTION 1")
                            .setDescription("What is your Minecraft username? (Make sure that all caps are correct and that there are no typo's)")
                            .setColor("00BFFF");

                        var question2 = new discord.MessageEmbed()
                            .setTitle("QUESTION 2")
                            .setDescription(`What is your Discord tag? (For example: **SkyblockSquad Bot#3596**)`)
                            .setColor("00BFFF");

                        var question3 = new discord.MessageEmbed()
                            .setTitle("QUESTION 3")
                            .setDescription("For how long have you been in the guild? (Answer 'IDK' if you don't know, we can check)")
                            .setColor("00BFFF");

                        var question4 = new discord.MessageEmbed()
                            .setTitle("QUESTION 4")
                            .setDescription("Why would you like to be staff?")
                            .setColor("00BFFF");

                        var question5 = new discord.MessageEmbed()
                            .setTitle("QUESTION 5")
                            .setDescription("How could you help our staff team?")
                            .setColor("00BFFF");

                        var question6 = new discord.MessageEmbed()
                            .setTitle("QUESTION 6")
                            .setDescription("Why should we choose you above the other applicants?")
                            .setColor("00BFFF");

                        var question7 = new discord.MessageEmbed()
                            .setTitle("QUESTION 7")
                            .setDescription("How many hours are online a day on average? (Doesn't have to be every single day, but most of the time)")
                            .setColor("00BFFF");

                        var question8 = new discord.MessageEmbed()
                            .setTitle("QUESTION 8")
                            .setDescription("How much guild experience do you get a day on average? (Doesn't have to be every single day, but most of the time, you can check using **/guild top**)")
                            .setColor("00BFFF");

                        var question9 = new discord.MessageEmbed()
                            .setTitle("QUESTION 9")
                            .setDescription("Anything else you want to tell us? (Say **no** if you don't)")
                            .setColor("00BFFF");

                        settedParent.send(information);

                        settedParent.send(question1);

                        settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                            var answer1 = answer.first();
                            settedParent.send(question2);

                            settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                var answer2 = answer.first();
                                settedParent.send(question3);

                                settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                    var answer3 = answer.first();
                                    settedParent.send(question4);

                                    settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                        var answer4 = answer.first();
                                        settedParent.send(question5);

                                        settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                            var answer5 = answer.first();
                                            settedParent.send(question6);

                                            settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                                var answer6 = answer.first();
                                                settedParent.send(question7);

                                                settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                                    var answer7 = answer.first();
                                                    settedParent.send(question8);

                                                    settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                                        var answer8 = answer.first();
                                                        settedParent.send(question9);

                                                        settedParent.awaitMessages(s => s.author.id === author.id, {max: 1}).then(answer => {
                                                            var answer9 = answer.first();

                                                            var application = new discord.MessageEmbed()
                                                                .setTitle("THANKS FOR YOUR APPLICATION!")
                                                                .setDescription(`**Question 1:** ${answer1}\n**Question 2**: ${answer2}\n**Question 3:** ${answer3}\n**Question 4:** ${answer4}\n**Question 5:** ${answer5}\n**Question 6:** ${answer6}\n**Question 7:** ${answer7}\n**Question 8:** ${answer8}\n**Question 9:** ${answer9}`)
                                                                .setColor("00BFFF")
                                                                .setFooter(embedFooter)
                                                                .setTimestamp()

                                                            settedParent.bulkDelete(18).then(
                                                                settedParent.send(application)
                                                            )
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })

                    }).catch(err => {
                        message.channel.send("**Error:** An error has occurred while trying to perform this command!");
                    })
            })

    },
};