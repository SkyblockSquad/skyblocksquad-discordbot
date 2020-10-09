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

    if(message.channel.type == "text") {

        if(!(message.channel.guild.id == "683205054681055233")) {
            if(!(message.channel.guild.id == "698797204701184060")) {

                if(message.author.bot) return;

                message.channel.send("Hey! This is not the SkyblockSquad Discord server! All functions have been disabled.");
                console.log(`The bot has been detected on an unknown server. Guild name: ${message.guild.name} | Guild owner: ${message.guild.owner}`);

                return;

            }

        }

    }
    
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
                {name: "**INFORMATION**", value: "Commands marked with a * are only available in the SkyblockSquad Discord!"}
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

        var randomOptions = ["I think yes, but I'm not completely sure.", "no", "Nobody knows!", "Sorry, I'm too lazy too answer.", "*akward silence*",
                            "*visible confusion*", "*insert joke here*", "Oops! My brain exploded while thinking about your question!",
                             "**Error:** An error has occurred while trying to perform this commannd.", "How about no?", "function: thumbsdown", "You are no longer **OP**",
                              "You are now **BANNED**", "function: no internet", "Error: Acces denied.", "function: ping alert", "function: wrong chat",
                               "function: delete message"]
        var randomInteger = Math.floor(Math.random() * randomOptions.length);
        var randomOption = randomOptions[randomInteger]

        if(randomOption === "function: thumbsdown") {

            message.react("👎");

            return;

        }

        if(randomOption === "function: no internet") {

            message.channel.send("Let me think about that...");

            setTimeout(function(){ 
                message.channel.send("My internet doesn't work so I can't acces google, sorry!")
             }, 2000);

             return;

        }

        if(randomOption === "function: ping alert") {

            message.channel.send("**PING ALERT!!!**");

            setTimeout(function(){
                message.channel.send(`<@${message.author.id}>`)
            }, 2000);

            return;

        }

        if(randomOption === "function: wrong chat") {

            message.channel.send("Hey Ultra, somebody is asking me something but I don't know the answer could you tell me? :)");

            setTimeout(function(){
                message.channel.send("oops, wrong chat");
            }, 1000);

            return;

        }

        if(randomOption === "function: delete message") {

            message.delete;
            message.channel.send("You don't have the right to talk here so I deleted your message noob");

            return;

        }
 
        message.channel.send(randomOption);

        return;

    }
 
});