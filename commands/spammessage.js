module.exports = {
    name: 'spammessage',
    description: 'Spam a message a certain amount of times! (Admin+)',
    category: 'Staff',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        if (args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,spammessage [amount] [message]**!");

        var amount = parseInt(args[0]);

        if (!(Number.isInteger(amount))) return message.channel.send("**Error:** Please provide a valid amount!");

        message.delete();

        var messageArray = args.shift();
        var text = messageArray.join(" ");

        for (let i = 0; i < amount; i++) {

            message.channel.send(text);

        }

    },
};