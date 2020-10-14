module.exports = {
    name: 'say',
    description: 'say',
    execute(message, args) {
    
        if(args.length <= 1) {
            return;
        }

        if(!(message.member.roles.find(r => r.name === "Guild Master"))) {
            return;
        }

        args.shift();
        var sayMessage = args.join(" ");

        message.delete();
        message.channel.send(sayMessage);

    },
};