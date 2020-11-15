module.exports = {
    name: 'random',
    description: 'random',
    execute(message, args) {

        if(args.length > 2 || args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,random [minimum] [maximum]**");

        var minimum = args[0];
        var maximum = args[1];

        minimum = parseInt(minimum, 10);
        maximum = parseInt(maximum, 10);

        var minimumCheck = minimum / 1;
        if(minimumCheck != minimum) return message.channel.send("**Error:** Oops! Something went wrong! *(Minimum amount is not a number)*");

        var maximumCheck = maximum / 1;
        if(maximumCheck != maximum) return message.channel.send("**Error:** Oops! Something went wrong! *(Maximum amount is not a number)*");

        var random = Math.floor(Math.random() * maximum + 1);

        for (let i = 0; true; i++) {
            if(random < minimum) {
                random = Math.floor(Math.random() * maximum + 1);
            } else {
                break;
            }
        }

        message.channel.send(`**Your random number is:** ${random}`);

    },
};