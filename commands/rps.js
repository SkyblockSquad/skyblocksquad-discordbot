module.exports = {
    name: 'rps',
    description: 'Duel the bot to an amazing rock, paper, scissors game!',
    category: 'Fun & Games',
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var options = ["rock", "paper", "scissors"];
        var result = options[Math.floor(Math.random() * options.length)];

        if (!(args[0].toUpperCase() === "ROCK")) {
            if (!(args[0].toUpperCase() === "PAPER")) {
                if (!(args[0].toUpperCase() === "SCISSORS")) {

                    var embed = new discord.MessageEmbed()
                        .setTitle("ROCK PAPER SCISSORS")
                        .setDescription("React with an emoji below to pick an option!\n\n:moyai: Rock\n:notepad_spiral: Paper\n:scissors: Scissors")
                        .setColor(botConfig.embedColor)
                        .setFooter(botConfig.embedFooter)

                    message.channel.send(embed).then(async msg => {

                        var emoji = await promptMessage(msg, message.author, 60, ["🗿", "🗒️", "✂️"])

                        if (emoji === "🗿") {
                            args = ["rock"];
                        } else if (emoji === "🗒️") {
                            args = ["paper"];
                        } else if (emoji === "✂️") {
                            args = ["scissors"];
                        }

                    })

                }
            }
        }

        var winMessageOptions = ["*you noob*", "*get destroyed*", "*jeez, you really are bad*", "*get clowned on*", "*It's obvious I'm too good for you*", "*lol*"]
        var winMessage = winMessageOptions[Math.floor(Math.random() * winMessageOptions.length)];

        var loseMessageOptions = ["*I'm sure you cheated*", "*HOW IS THIS POSSIBLE*", "*That was a nice game!*", "*GG*", "*It's obvious that you cheated lol*",
            "*You are now BANNED*"]

        var loseMessage = loseMessageOptions[Math.floor(Math.random() * loseMessageOptions.length)];

        var tieMessageOptions = ["*I'm sure that next time I'll win*", "*GG*", "*Next time you'll get destroyed*", "*Well, that was a fun game!*", "nice one!"]
        var tieMessage = tieMessageOptions[Math.floor(Math.random() * tieMessageOptions.length)];

        if (args[0].toUpperCase() == "ROCK") {

            if (result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                return message.channel.send(`**I win!** ${winMessage}`);

            } else if (result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                return message.channel.send(`**You win...** ${loseMessage}`);

            } else if (result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                return message.channel.send(`**It's a tie!** ${tieMessage}`);

            }

        }

        else if (args[0].toUpperCase() == "PAPER") {

            if (result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                return message.channel.send(`**It's a tie!** ${tieMessage}`);

            } else if (result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                return message.channel.send(`**I win!** ${winMessage}`);

            } else if (result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                return message.channel.send(`**You win...** ${loseMessage}`);

            }

        }

        else if (args[0].toUpperCase() == "SCISSORS") {

            if (result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                return message.channel.send(`**You win...** ${loseMessage}`);

            } else if (result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                return message.channel.send(`**It's a tie!** ${tieMessage}`);

            } else if (result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                return message.channel.send(`**I win!** ${winMessage}`);

            }
        }

        async function promptMessage(message, author, time, reactions) {

            time *= 1000;

            for (const reaction of reactions) {
                await message.react(reaction);
            }

            const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

            return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

        }

    },
};