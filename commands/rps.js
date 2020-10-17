module.exports = {
    name: 'rps',
    description: 'rps',
    execute(message, args) {

        if(!args[1]) return message.channel.send("**Error:** Invalid syntax! Please use: **,rps (rock|paper|scissors)**");

        var options = ["rock", "paper", "scissors"];
        var result = options[Math.floor(Math.random() * options.length)];

        if(!(args[1].toUpperCase() === "ROCK")) {
            if(!(args[1].toUpperCase() === "PAPER")) {
                if(!(args[1].toUpperCase() === "SCISSORS")) {
                    message.channel.send("**Error:** Invalid syntax! Please use: **,rps (rock|paper|scissors)**");
                    return;
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

        if(args[1].toUpperCase() == "ROCK") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send(`**I win!** ${winMessage}`);
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send(`**You win...** ${loseMessage}`);
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send(`**It's a tie!** ${tieMessage}`);
                return;

            }

        }

        else if(args[1].toUpperCase() == "PAPER") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send(`**It's a tie!** ${tieMessage}`);
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send(`**I win!** ${winMessage}`);
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send(`**You win...** ${loseMessage}`);
                return;

            }

        }

        else if(args[1].toUpperCase() == "SCISSORS") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send(`**You win...** ${loseMessage}`);
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send(`**It's a tie!** ${tieMessage}`);
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send(`**I win!** ${winMessage}`);
                return;

            }

        }

    },
};