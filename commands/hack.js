module.exports = {
    name: 'hack',
    description: 'hack',
    execute(discord, message, embedColor, embedFooter, args) {

        if(message.channel.type == "dm") {
            message.channel.send('**Error:** This command can not be used in DM!');
            return;
        }

        if(args.length == 2 && args[1].toLowerCase() === "hypixel") {

            message.channel.send("I'm currently hacking HypixeL... Please wait...")

            var PasswordOptions = ["hypixel_skyblock_is_cool", "mineplex_smells", "SuperSecretPassword123", "hypickle", "technoblade_potatoboy", "stonks", "What_is_a_password?"]
            var PasswordInteger = Math.floor(Math.random() * PasswordOptions.length);
            var PasswordOption = PasswordOptions[PasswordInteger];
            
            var botEmbed = new discord.MessageEmbed()
                .setTitle("HACKING HYPIXEL...")
                .setDescription(`Here are Hypixel's e-mail and password:`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "E-mail:", value: "creators@hypixel.net"},
                    {name: "Password: ", value: `${PasswordOption}`}
                );

                message.channel.send(botEmbed);
                return;
    
        }

        message.react('👍').then(() => message.react('👎'));
        const filter = (reaction, user) => {
	        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
	        .then(collected => {
		        const reaction = collected.first();

		        if (reaction.emoji.name === '👍') {
                    message.channel.send('You wish.');
                    message.reactions.removeAll();
		        } else {
                    message.channel.send('Nice! You are actually not a hacker!');
                    message.reactions.removeAll();
		        }
	        })
	        .catch(collected => {
                message.channel.send('**Error:** No reaction within 30 seconds!');
                message.reactions.removeAll();
	        });

    },
};