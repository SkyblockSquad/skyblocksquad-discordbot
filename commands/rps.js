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

        if(args[1].toUpperCase() == "ROCK") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send("**I win!** *you noob*");
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send("**You win...** *I'm sure you cheated*");
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send("**It's a tie!** *I'm sure that next time I'll win*");
                return;

            }

        }

        else if(args[1].toUpperCase() == "PAPER") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send("**It's a tie!** *I'm sure that next time I'll win.*");
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send("**I win!** *you noob*");
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send("**You win...** *I'm sure you cheated*");
                return;

            }

        }

        else if(args[1].toUpperCase() == "SCISSORS") {

            if(result == "paper") {

                message.channel.send(`I choose: **Paper** :notepad_spiral:`);
                message.channel.send("**You win...** *I'm sure you cheated*");
                return;

            } else if(result == "scissors") {

                message.channel.send(`I choose: **Scissors** :scissors:`);
                message.channel.send("**It's a tie!** *I'm sure that next time I'll win*");
                return;

            } else if(result == "rock") {

                message.channel.send(`I choose: **Rock** :moyai:`);
                message.channel.send("**I win!** *you noob*");
                return;

            }

        }

    },
};