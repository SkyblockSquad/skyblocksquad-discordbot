module.exports = {
    name: 'random',
    description: '*Generate a random numer!*',
    category: 'Fun & Games',
    execute(message, args) {

        if (args.length > 2 || args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,random [minimum] [maximum]**");

        var minimum = args[0];
        var maximum = args[1];

        minimum = parseInt(minimum, 10);
        maximum = parseInt(maximum, 10);

        var minimumCheck = minimum / 1;
        if (minimumCheck != minimum) return message.channel.send("**Error:** Oops! Something went wrong! *(Minimum amount is not a number)*");

        var maximumCheck = maximum / 1;
        if (maximumCheck != maximum) return message.channel.send("**Error:** Oops! Something went wrong! *(Maximum amount is not a number)*");

        if (!Number.isInteger(minimum)) return message.channel.send("**Error:** The minimum amount isn't a number!");
        if (!Number.isInteger(maximum)) return message.channel.send("**Error:** The maximum amount isn't a number!");


        if (minimum > maximum) return message.channel.send("**Error:** Your minimum count can't be higher then your maximum count!");
        if (minimum == maximum) return message.channel.send("**Error:** Dude! Why would you set the minimum and maximum to the same number? :thinking:");

        var random = Math.floor(Math.random() * maximum + 1);

        for (let i = 0; true; i++) {
            if (random < minimum) {
                random = Math.floor(Math.random() * maximum + 1);
            } else {
                break;
            }
        }

        message.channel.send(`**Your random number is:** ${random.toLocaleString()}`);

    },
};