module.exports = {
    name: 'poll',
    description: 'poll',
    execute(message, args) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission!");

        var options = message.content.split(" / ");
        var reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

        if(options.length < 3 || options.length > 6) return message.channel.send("**Error:** Invalid syntax! Please use **,poll [question] [option 1] [option 2] {option 3}...**\n*Minimum 2 options - Maximum 5 options*");

        var question = options[0];
        options.shift();

        for (let i = 0; i < options.length; i++) {
            message.react(reactions[i]);
        }

    },
};