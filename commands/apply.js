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

                        var question_txt1 = "What is your Minecraft username? (Make sure that all caps are correct and that there are no typo's)";
                        var question_txt2 = "What is your Discord tag? (For example: **SkyblockSquad Bot#3596**)";
                        var question_txt3 = "For how long have you been in the guild? (Answer 'IDK' if you don't know, we can check)";
                        var question_txt4 = "Why would you like to be staff?";
                        var question_txt5 = "How could you help our staff team?";
                        var question_txt6 = "Why should we choose you above the other applicants?";
                        var question_txt7 = "How many hours are online a day on average? (Doesn't have to be every single day, but most of the time)";
                        var question_txt8 = "How much guild experience do you get a day on average? (Doesn't have to be every single day, but most of the time, you can check using **/guild top**)";
                        var question_txt9 = "Anything else you want to tell us? (Say **no** if you don't)";

                        var question1 = new discord.MessageEmbed()
                            .setTitle("QUESTION 1")
                            .setDescription(question_txt1)
                            .setColor("00BFFF");

                        var question2 = new discord.MessageEmbed()
                            .setTitle("QUESTION 2")
                            .setDescription(question_txt2)
                            .setColor("00BFFF");

                        var question3 = new discord.MessageEmbed()
                            .setTitle("QUESTION 3")
                            .setDescription(question_txt3)
                            .setColor("00BFFF");

                        var question4 = new discord.MessageEmbed()
                            .setTitle("QUESTION 4")
                            .setDescription(question_txt4)
                            .setColor("00BFFF");

                        var question5 = new discord.MessageEmbed()
                            .setTitle("QUESTION 5")
                            .setDescription(question_txt5)
                            .setColor("00BFFF");

                        var question6 = new discord.MessageEmbed()
                            .setTitle("QUESTION 6")
                            .setDescription(question_txt6)
                            .setColor("00BFFF");

                        var question7 = new discord.MessageEmbed()
                            .setTitle("QUESTION 7")
                            .setDescription(question_txt7)
                            .setColor("00BFFF");

                        var question8 = new discord.MessageEmbed()
                            .setTitle("QUESTION 8")
                            .setDescription(question_txt8)
                            .setColor("00BFFF");

                        var question9 = new discord.MessageEmbed()
                            .setTitle("QUESTION 9")
                            .setDescription(question_txt9)
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
                                                                .setDescription("Thanks for your application!")
                                                                .setColor("00BFFF")
                                                                .setFooter(embedFooter)
                                                                .setTimestamp()
                                                                .addFields(
                                                                    {name: `**Question 1:** ${question_txt1}`, value: `Answer: ${answer1}`},
                                                                    {name: `**Question 2:** ${question_txt2}`, value: `Answer: ${answer2}`},
                                                                    {name: `**Question 3:** ${question_txt3}`, value: `Answer: ${answer3}`},
                                                                    {name: `**Question 4:** ${question_txt4}`, value: `Answer: ${answer4}`},
                                                                    {name: `**Question 5:** ${question_txt5}`, value: `Answer: ${answer5}`},
                                                                    {name: `**Question 6:** ${question_txt6}`, value: `Answer: ${answer6}`},
                                                                    {name: `**Question 7:** ${question_txt7}`, value: `Answer: ${answer7}`},
                                                                    {name: `**Question 8:** ${question_txt8}`, value: `Answer: ${answer8}`},
                                                                    {name: `**Question 9:** ${question_txt9}`, value: `Answer: ${answer9}`},
                                                                )

                                                            settedParent.bulkDelete(19).then(
                                                                settedParent.send(application)
                                                            )

                                                            setTimeout(function() {
                                                                var finishing = new discord.MessageEmbed()
                                                                    .setTitle("FINISHING APLICATION...")
                                                                    .setDescription("I'm currently finishing your application...")
                                                                    .setColor("00BFFF")
                                                                    .setFooter(embedFooter)

                                                                async function sendFinish() {
                                                                    var finish = await settedParent.send(finishing);

                                                                    settedParent.updateOverwrite(author.id, {
                                                                        SEND_MESSAGES: false,
                                                                        VIEW_CHANNEL: true,
                                                                        READ_MESSAGE_HISTORY: true,
                                                                        READ_MESSAGES: true
                                                                    });

                                                                    setTimeout(function() {
                                                                        finish.delete();
                                                                    }, 5000);
                                                                }

                                                                sendFinish();

                                                            }, 1000);

                                                            setTimeout(function() {

                                                                settedParent.updateOverwrite(author.id, {
                                                                    SEND_MESSAGES: false,
                                                                    VIEW_CHANNEL: false,
                                                                    READ_MESSAGE_HISTORY: false,
                                                                    READ_MESSAGES: false
                                                                });

                                                                var authorEmbed = new discord.MessageEmbed()
                                                                    .setTitle("APPLICATION AUTHOR")
                                                                    .setDescription(`This application has been sent by: <@${author.id}>`)
                                                                    .setColor("00BFFF")
                                                                    .setFooter(embedFooter)

                                                                settedParent.send(authorEmbed);

                                                            }, 7500);
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