const { DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'poll',
    description: 'poll',
    execute(message, args, discord, embedColor, embedFooter) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission!");

        var options = message.content.split(" / ");
        var reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

        if(options.length < 3 || options.length > 6) return message.channel.send("**Error:** Invalid syntax! Please use **,poll [question] [option 1] [option 2] {option 3}...**\n*Minimum 2 options - Maximum 5 options*");

        var question = options[0];
        question = question.slice(6, question.length);
        options.shift();

        var botEmbed = new discord.MessageEmbed()
        .setTitle("POLL")
        .setDescription(`Poll started by: <@${message.author.id}>`)
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()
        .addField("Question", `The question is: **${question}**`)

        for (let i = 0; i < options.length; i++) {
            
            const element = options[i]; 
            
            botEmbed.addField(`Option ${(i + 1).toString()}`, element);
        }

        message.channel.send(botEmbed);
        message.delete();

        for (let i = 0; i < options.length; i++) {

            embed = message.channel.messages.cache.last;
            embed.react(reactions[i]);
        }

    },
};