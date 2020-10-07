// Setup discord.js and botconfig.json
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Setup variables
var prefix = botConfig.prefix;
var embedColor = "#ed2121";
var embedFooter = "SkyblockSquad Bot, Made for the SkyblockSquad Discord Server";

// Login the bot
const client = new discord.Client();
client.login(process.env.token);

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
    client.user.setActivity(",help | SkyblockSquad Bot", {type: "PLAYING"});

});

// Bot commands
client.on("message", async message => {
    
    if(message.author.bot) return;

    var args = message.content.split(" ");
    var command = args[0]

    if(command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setDescription("See a list of bot commands below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: `${prefix}help`, value: "Display this list!"},
                {name: `${prefix}info`, value: "Display bot and server info!"},
                {name: `${prefix}me`, value: "Display info about yourself!"},
                {name: `${prefix}hello`, value: "Say hello to the bot!"},
                {name: `${prefix}hack*`, value: "Hack the server!"},
                {name: `${prefix}is <player> <something>?*`, value: "Ask some questions to the bot!"},
                {name: "Note", value: "Commands marked with '*' are only available in server channels."}
            )

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var botEmbed = new discord.MessageEmbed()
        .setTitle("INFO")
        .setDescription("See info about the bot below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()

        if(!(message.channel.type == "dm")) {

            botEmbed.addFields(
                {name: "Server Name", value:message.guild.name},
                {name: "Server Member Count", value:message.guild.memberCount},
                {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
                {name: "Server Channel", value:message.channel.name}
            );            

        }

        botEmbed.addFields(
            {name: "Bot Name", value:client.user},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime}
        );

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}me`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("ME")
            .setDescription("See info about you below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: `${message.author.username}'s Name`, value: `<@${message.author.id}>`},
                {name: `${message.author.username}'s User ID `, value:message.author.id},
                {name: `${message.author.username} Joined Discord At`, value:message.author.createdAt}
            );

            return message.channel.send(botEmbed);

    }

    if(command === `${prefix}hello`) {

        return message.channel.send(`Hello there, <@${message.author.id}>!`);

    }

    if(command === `${prefix}hack`) {

        if(message.channel.type == "dm") {
            message.channel.send('Error: This command can only be used in a server channel!');
            return;
        }

        if(args.length == 2 && args[1].toLowerCase() === "hypixel") {

            message.channel.send("Hacking Hypixel... Please wait...")
            
            var botEmbed = new discord.MessageEmbed()
                .setTitle("HACKING HYPIXEL...")
                .setDescription(`Here are Hypixel's e-mail and password:`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    {name: "E-mail:", value: "creators@hypixel.net"},
                    {name: "Password: ", value: "hypixel_skyblock_is_cool"}
                );

            var HackMessage = message.channel.send(botEmbed);
            
            HackMessage.react('👍');
    
        }

        if(!(args.length === 1)) {
           
            message.channel.send("Error: You don't need to provide arguments!")
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
                message.channel.send('Command has been cancelled.');
                message.channel.send('Reason: No reaction within 30 seconds');
                message.reactions.removeAll();
	        });

    }

    if(command === `${prefix}is`) {

        if(message.channel.type == "dm") {
            message.channel.send('Error: This command can only be used in a server channel!');
            return;
        }

        if(args.length < 3) {

            message.channel.send('Error: This command needs atleast 3 arguments!');
            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "cool?") {

            message.channel.send("no.");

            return;
        }

        if(args.length == 3 && args[2].toLowerCase() === "dumb?") {

            message.channel.send("I don't think so...");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "smart?") {

            message.channel.send("Yes, they are.");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "awesome?") {

            message.channel.send("no.");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "wise?") {

            message.channel.send("Error: An error has occurred while trying to perform this action");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "stonks?") {

            message.channel.send("Yes, stonks");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "owo?") {

            message.channel.send("OwOwO");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "big?") {

            message.channel.send("Pretty pretty big poggers");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "pog?") {

            message.channel.send("Poggers, am I right chat");

            return;

        }

        if(args.length == 3 && args[2].toLowerCase() === "weird?") {

            message.channel.send("Weirdo");

            return;
            
        }

        var randomOptions = ["I think yes, but I'm not completely sure.", "no", "Nobody knows!", "Sorry, I'm too lazy too answer.", "*akward silence*", "*visible confusion*", "*insert joke here*", "Oops! My brain exploded while thinking about your question!"]
        var randomInteger = Math.floor(Math.random() * randomOptions.length);
        var randomOption = randomOptions[randomInteger]

        message.channel.send(randomOption);

        return;

    }
 
});