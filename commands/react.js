module.exports = {
    name: 'react',
    description: 'react',
    execute(message, args, discord, embedFooter) {
    
        if(!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("**Error:** You don't have permission to do this!");

        if(args.length > 2 || args.length < 2) return message.channel.send("**Error:** Invalid syntax! Please use **,react [seconds] [amount]**! ");

        var reactionEmbed = new discord.MessageEmbed()
            .setTitle("REACT!")
            .setDescription("React on this message! Quick! You don't have much time!")
            .setColor("00BFFF")
            .setFooter(embedFooter)

        async function sendEmbed() {
            var embed = await message.channel.send(reactionEmbed);
            embed.react("☑️");

            const filter = (reaction, user) => {
                return reaction.emoji.name === "☑️" && user.id === message.author.id;
            };
    
            var timeInt = Number.parseInt(args[0], 10);
            timeInt *= 1000;
    
            var amountInt = Number.parseInt(args[1], 10);

            if(amountInt < 2) return message.channel.send("**Error:** The amount must be atleast 2!");
    
            embed.awaitReactions(filter, { max: amountInt, time: timeInt, errors: ["time"] })
                .then(collected => message.channel.send(`**${collected.size} people have reacted!**`))
                .catch(collected => {
                    message.channel.send(`**Only ${collected.size}/${amoutnInt} people have reacted!**`)
                });
        }

        sendEmbed();

    },
};