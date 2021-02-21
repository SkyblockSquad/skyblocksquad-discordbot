module.exports = {
    name: 'apply',
    description: 'Apply for Helper! (Level 5)+',
    category: 'Miscellaneous',
    execute(client, message, args, isCommand) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");
        const applicationData = require("../data/applicationData.json");

        if (message.guild.me.roles.cache.has("786237532684681246")) return message.channel.send("Applications are currently closed. Sorry for any inconvenience.");

        var embedFooter = botConfig.embedFooter;

        var categoryID = "774903762447630367";
        var author = message.author;

        var channelName = "application-" + author.username;

        var ticket = false;

        message.guild.channels.cache.forEach(channel => {

            if (channel.name.toLowerCase() === channelName.toLowerCase()) {
                ticket = true;
                return message.channel.send("**Error:** You already started an application!");
            }
        });

        var level5role = message.member.roles.cache.find(role => role.id === "773453425501405225");
        var level10role = message.member.roles.cache.find(role => role.id === "773453677779484672");
        var level15role = message.member.roles.cache.find(role => role.id === "773453879689740288");
        var level20role = message.member.roles.cache.find(role => role.id === "773454008974704650");
        var level25role = message.member.roles.cache.find(role => role.id === "773454133557592094");
        var level30role = message.member.roles.cache.find(role => role.id === "773454210166554646");
        var level35role = message.member.roles.cache.find(role => role.id === "773454351787753473");
        var level40role = message.member.roles.cache.find(role => role.id === "773454498160181259");
        var level45role = message.member.roles.cache.find(role => role.id === "773454622190600222");
        var level50role = message.member.roles.cache.find(role => role.id === "773454761503490098");

        if (!level5role && !level10role && !level15role && !level20role && !level25role && !level30role && !level35role && !level40role && !level45role && !level50role) {
            return message.channel.send("**Error:** You must be atleast **level 5** or higher to do this!");
        }

        var proRole = message.member.roles.cache.find(role => role.id === "683206276586668053");
        var adminRole = message.member.roles.cache.find(role => role.id === "683205637001183365");
        var gmRole = message.member.roles.cache.find(role => role.id === "683205412488478809");

        // if (!proRole && !adminRole && !gmRole) return message.channel.send("**Error:** You need to be Pro to use this command!");

        var bannedRole = message.member.roles.cache.find(role => role.id === "779011412411547669");

        if (bannedRole) return message.channel.send("**Error:** Oops! You are application banned!");

        if (ticket) return;

        message.delete();

        var embed = new discord.MessageEmbed()
            .setTitle("CREATING CHANNEL...")
            .setDescription("Please wait while I create your application ticket...")
            .setColor("00BFFF")
            .setFooter(embedFooter);

        message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));

        message.guild.channels.create(channelName, { type: "text" }).then(
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

                        settedParent.setTopic(`**ID:** ${author.id} **User:** <@${author.id}>`);

                        settedParent.send(`[<@${author.id}>]`);

                        var information = new discord.MessageEmbed()
                            .setTitle("WELCOME TO YOUR TICKET!")
                            .setDescription("This is your ticket. Before answering the questions, make sure that you agree with everything in the #applications channel!")
                            .setColor("00BFFF")
                            .addField("Note", "If the bot doesn't respond in about a minute,\nit's probally because the bot restarted\nor crashed during your application. Please\nmessage an Administrator if this happens.");

                        var question_txt1 = applicationData.question1;
                        var question_txt2 = applicationData.question2;
                        var question_txt3 = applicationData.question3;
                        var question_txt4 = applicationData.question4;
                        var question_txt5 = applicationData.question5;
                        var question_txt6 = applicationData.question6;
                        var question_txt7 = applicationData.question7;
                        var question_txt8 = applicationData.question8;
                        var question_txt9 = applicationData.question9;

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

                        settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                            var answer1 = answer.first();
                            settedParent.send(question2);

                            settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                var answer2 = answer.first();
                                settedParent.send(question3);

                                settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                    var answer3 = answer.first();
                                    settedParent.send(question4);

                                    settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                        var answer4 = answer.first();
                                        settedParent.send(question5);

                                        settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                            var answer5 = answer.first();
                                            settedParent.send(question6);

                                            settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                                var answer6 = answer.first();
                                                settedParent.send(question7);

                                                settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                                    var answer7 = answer.first();
                                                    settedParent.send(question8);

                                                    settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                                        var answer8 = answer.first();
                                                        settedParent.send(question9);

                                                        settedParent.awaitMessages(s => s.author.id === author.id, { max: 1 }).then(answer => {
                                                            var answer9 = answer.first();

                                                            var application = new discord.MessageEmbed()
                                                                .setTitle("THANKS FOR YOUR APPLICATION!")
                                                                .setDescription("Thanks for your application!")
                                                                .setColor("00BFFF")
                                                                .setFooter(embedFooter)
                                                                .setTimestamp()
                                                                .addFields(
                                                                    { name: `**Question 1:** ${question_txt1}`, value: `Answer: ${answer1}` },
                                                                    { name: `**Question 2:** ${question_txt2}`, value: `Answer: ${answer2}` },
                                                                    { name: `**Question 3:** ${question_txt3}`, value: `Answer: ${answer3}` },
                                                                    { name: `**Question 4:** ${question_txt4}`, value: `Answer: ${answer4}` },
                                                                    { name: `**Question 5:** ${question_txt5}`, value: `Answer: ${answer5}` },
                                                                    { name: `**Question 6:** ${question_txt6}`, value: `Answer: ${answer6}` },
                                                                    { name: `**Question 7:** ${question_txt7}`, value: `Answer: ${answer7}` },
                                                                    { name: `**Question 8:** ${question_txt8}`, value: `Answer: ${answer8}` },
                                                                    { name: `**Question 9:** ${question_txt9}`, value: `Answer: ${answer9}` },
                                                                )

                                                            settedParent.bulkDelete(100).then(
                                                                settedParent.send(application)
                                                            )

                                                            setTimeout(function () {
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

                                                                    setTimeout(function () {
                                                                        finish.delete();
                                                                    }, 5000);
                                                                }

                                                                sendFinish();

                                                            }, 1000);

                                                            setTimeout(function () {

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

                                                                settedParent.send("[<@&683205637001183365>]");

                                                                var cmdArgs = ["Should", "this", "person", "be", "accepted?", "/", "Yes", "/", "No"];

                                                                var pollCmd = client.commands.get("poll");

                                                                pollCmd.execute(client, message, cmdArgs, false);

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
                        message.channel.send("**Error:** Oops! Something went wrong!");
                    })
            })

    },
};
