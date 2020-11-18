module.exports = {
    name: 'say',
    description: 'say',
    execute(message, args) {

        if (!(message.member.hasPermission("ADMINISTRATOR"))) return;
        if (args.length == 0) return;

        var say = args.join(" ");

        message.delete();
        message.channel.send(say);

    },
};