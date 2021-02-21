module.exports = {
    name: 'repeat',
    description: 'Make the bot repeat whatever you say!',
    category: 'Fun & Games',
    execute(client, message, args, isCommand, channel) {

        if(args.length < 1) return message.channel.send("**Error:** Invalid syntax! Please use **,repeat [message]**!")

        var input = args.join(" ");

        if(input.toLowerCase() === "im dumb" || input.toLowerCase() === "i'm dumb") return message.channel.send("Yeah we know.");
        if(input.toLowerCase() === "im stupid" || input.toLowerCase() === "i'm stupid") return message.channel.send("Yeah we know.");
        if(input.toLowerCase() === "im an idiot" || input.toLowerCase() === "i'm an idiot") return message.channel.send("Yeah we know.");

        message.channel.send(input);

    },
};