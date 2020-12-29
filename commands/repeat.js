module.exports = {
    name: 'repeat',
    description: 'Make the bot repeat a message you say!',
    category: 'Fun & Games',
    execute(client, message, args) {

        var input = args.join(" ");

        if(input.toLowerCase() === "im dumb" || input.toLowerCase() === "i'm dumb") return message.channel.send("Yeah we know.");
        if(input.toLowerCase() === "im stupid" || input.toLowerCase() === "i'm stupid") return message.channel.send("Yeah we know.");
        if(input.toLowerCase() === "im an idiot" || input.toLowerCase() === "i'm an idiot") return message.channel.send("Yeah we know.");

        message.channel.send(input);

    },
};