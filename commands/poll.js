module.exports = {
    name: 'poll',
    description: 'poll',
    execute(message, discord, embedColor, embedFooter) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission!");

        var content = message.content;

        if(content.endsWith("-a")) {
            var anonymous = "True";
            content = content.slice(0, content.length - 3);
        } else var anonymous = "False";

        if(content.endsWith("-p")) {
            var ping = "True";
            content = content.slice(0, content.length - 3);
        } else var ping = "False";

        if(anonymous === "False") {
            if(content.endsWith("-a")) {
                var anonymous = "True";
                content = content.slice(0, content.length - 3)
            } else var anonymous = "False";
        }

        content = content.split(" / ");

        var options = content;

        var reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

        if(options.length < 3 || options.length > 11) return message.channel.send("**Error:** Invalid syntax! Please use **,poll [question] / [option 1] / [option 2] / {option 3}... {-a}**\n*Minimum 2 options - Maximum 10 options*\n*Add -a to the end to create an anonymous poll*");

        var question = options[0];
        question = question.slice(6, question.length);
        options.shift();

        var botEmbed = new discord.MessageEmbed()
        .setTitle("POLL")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addField("Question", `The question is: **${question}**`)

        if(anonymous === "False") botEmbed.setDescription(`This poll was started by: <@${message.author.id}>`);
        if(ping === "True") message.channel.send("<@&772859858688802818>");

        for (let i = 0; i < options.length; i++) {
            
            const element = options[i]; 
            
            botEmbed.addField(`Option ${(i + 1).toString()}`, element);
        }

        async function sendPoll() {
            
            const poll = await message.channel.send(botEmbed);

            for (let i = 0; i < options.length; i++) {

                poll.react(reactions[i]);
    
            }

        }

        sendPoll();

        message.delete();

    },
};