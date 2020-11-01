module.exports = {
    name: 'poll',
    description: 'poll',
    execute(message, args) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission!");

        var options = message.content.split(" / ");
        var reactions = [":one:", ":two:", ":three:", ":four:", ":five;"];

        message.react(reactions[0]);

    },
};