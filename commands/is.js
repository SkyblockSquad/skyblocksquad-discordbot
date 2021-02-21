module.exports = {
    name: 'is',
    description: 'Ask all your questions to the bot! He knows everything!',
    category: 'Fun & Games',
    execute(client, message, args, isCommand) {

        if (args.length < 2) return message.channel.send("**Error:** You need to provide atleast 2 arguments!");

        var randomOptions = ["I think yes, but I'm not completely sure.", "no", "Nobody knows!", "Sorry, I'm too lazy too answer.", "*akward silence*",
            "*visible confusion*", "*insert joke here*", "Oops! My brain exploded while thinking about your question!",
            "**Error:** An error has occurred while trying to perform this commannd!", "How about no?", "function: thumbsdown", "You are no longer **OP**",
            "You are now **BANNED**", "function: no internet", "**Error:** You don't have permission to use this command!", "function: ping alert",
            "function: delete message", "(._.)", ".", "function: fake ping", "yes",
            "Do I smell a bad question?", "Sorry I don't know :("];

        var randomOption = randomOptions[Math.floor(Math.random() * randomOptions.length)];

        if (randomOption === "function: thumbsdown") return message.react("👎");

        if (randomOption === "function: no internet") {

            message.channel.send("Let me think about that...");

            setTimeout(function () {
                message.channel.send("My internet doesn't work so I can't acces Google, sorry!")
            }, 2000);

            return;

        }

        if (randomOption === "function: ping alert") {

            message.channel.send("**PING ALERT!!!**");

            setTimeout(function () {
                message.channel.send(`<@${message.author.id}>`)
            }, 2000);

            return;

        }

        if (randomOption === "function: delete message") {

            message.delete();
            return message.channel.send("Where's your message now? Oops! >:)");

        }

        if (randomOption === "function: fake ping") {

            message.channel.send("**PING ALERT!**");

            setTimeout(function () {
                message.channel.send("Lol it's fake")
            }, 2000);

            return;

        }

        return message.channel.send(randomOption);

    },
};