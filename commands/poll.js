module.exports = {
    name: 'poll',
    description: 'poll',
    execute(message, args) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission!");

        var options = message.content.split(" / ");
        var reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

        if(options.length < 2) return message.channel.send("**Error:** You need atleast 2 options!");
        if(options.length > 5) return message.channel.send("**Error:** You can only have up to 5 options!");

        for (let i = 0; i < options.length; i++) {
            message.react(reactions[i]);
        }

    },
};