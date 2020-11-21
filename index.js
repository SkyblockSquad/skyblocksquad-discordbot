const discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const moment = require("moment");

console.log("Loading data files...");

const botConfig = require("./data/botconfig.json");
console.log("Data file \"botconfig.json\" has been loaded.");

var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
console.log("Data file \"swearWords.json\" has been loaded.");

const dataFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
console.log(`${dataFiles.length} data files have been loaded.`);

const client = new discord.Client();
client.login(process.env.token);

console.log("Loading command files...");

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`Command file "${command.name}.js" has been loaded.`);

}

console.log(`${commandFiles.length} command files have been loaded.`);

var prefix = botConfig.prefix;
var embedColor = botConfig.embedColor;
var embedFooter = botConfig.embedFooter;

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
    client.user.setActivity(",help | SkyblockSquad Bot", { type: "PLAYING" });

});

// Server detection
client.on("message", async message => {

    if (message.channel.type === "dm") return;

    if (message.channel.parentID === "774903762447630367") {

        if (message.author.bot && message.author.id !== "715568351052693622") {
            message.delete();
        }

    }

    if (message.channel.id === "774544902569590796") {
        if (message.author.bot && message.author.id === "649604306596528138") {

            setTimeout(function () {
                message.channel.send("[<@&746261958302367766>]");
            }, 3000);

        }
    }

    if (message.author.bot) return;

    var mutedRole = message.member.roles.cache.find(role => role.id === "703187997822025738");
    if (mutedRole) {

        var adminRole = message.member.roles.cache.find(role => role.id === "683205637001183365");
        var gmRole = message.member.roles.cache.find(role => role.id === "683205412488478809");
        if (!adminRole && !gmRole) message.delete();

    }

    var check = message.content.toLowerCase();

    for (let i = 0; i < swearWords["swearWords"].length; i++) {
        if (check.includes(swearWords["swearWords"][i])) {

            message.delete();

            var channel = message.guild.channels.cache.find(ch => ch.name === "bot-logs");

            var botEmbed = new discord.MessageEmbed()
                .setTitle("SWEAR FILTER")
                .setDescription(`${message.author.username} tried to swear!`)
                .setColor(embedColor)
                .setFooter(embedFooter)
                .setTimestamp()
                .addFields(
                    { name: "Message", value: message.content },
                    { name: "Warn command", value: `You can warn them using:\n**eli warn ${message.author.id} Swearing (Rule IV)**` }
                )

            channel.send(botEmbed);

            return message.channel.send(`<@${message.author.id}>: **Please don't use that kind of language!**`).then(msg => msg.delete({ timeout: 5000 }));
        }
    }

    if (message.content.includes("‎")) {

        message.delete();

        var channel = message.guild.channels.cache.find(ch => ch.name === "bot-logs");

        var botEmbed = new discord.MessageEmbed()
            .setTitle("INVISIBLE CHARACTER FILTER")
            .setDescription(`${message.author.username} tried to use invisble characters!`)
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addField("Warn command", `You can warn them using:\n**eli warn ${message.author.id} Using invisble characters (Rule X)**`)

        channel.send(botEmbed);

        return message.channel.send(`<@${message.author.id}>: **Please don't use invisible characters!**`).then(msg => msg.delete({ timeout: 5000 }));

    }

    if (!(message.member.hasPermission("ADMINISTRATOR"))) {
        if (!(message.channel.id === "703168301634945097")) {
            if (message.content.startsWith(`${prefix}`)) {

                message.delete();
                return message.channel.send(`<@${message.author.id}>: **Please use the #bot-commands channel for bot commands!**`).then(msg => msg.delete({ timeout: 10000 }));

            }
        }
    }

    if(message.mentions.users.size > 0) {

        message.mentions.users.forEach(m => {

            var afkRole = message.guild.members.cache.get(m).roles.cache.find(role => role.id === "779718452075954197");

            if(!afkRole == undefined) {
                message.channel.send(`**${m.username}** is currently AFK!`);
            }

        })

    }

    var args = message.content.split(" ");
    var command = args[0]
    args.shift();

    if (command === `${prefix}info`) {
        client.commands.get("info").execute(discord, message, embedColor, embedFooter, client, args, moment);
    }

    if (command === `${prefix}hack`) {
        client.commands.get("hack").execute(discord, message, embedColor, embedFooter, args);
    }

    if (command === `${prefix}is`) {
        client.commands.get("is").execute(message, args);
    }

    if (command === `${prefix}covid`) {
        client.commands.get("covid").execute(discord, message, embedColor, embedFooter, args, fetch);
    }

    if (command === `${prefix}rps`) {
        client.commands.get("rps").execute(message, args);
    }

    if (command === `${prefix}say`) {
        client.commands.get("say").execute(message, args);
    }

    if (command === `${prefix}ping`) {
        client.commands.get("ping").execute(message, args, client);
    }

    if (command === `${prefix}profile`) {
        client.commands.get("profile").execute(message, args, fetch);
    }

    if (command === `${prefix}hypixel`) {
        client.commands.get("hypixel").execute(message, args, discord, fetch, embedColor, embedFooter, moment);
    }

    if (command === `${prefix}poll`) {
        client.commands.get("poll").execute(message, discord, embedColor, embedFooter);
    }

    if (command === `${prefix}slowmode`) {
        client.commands.get("slowmode").execute(message, args);
    }

    if (command === `${prefix}me`) {
        client.commands.get("me").execute(message, args, discord, embedColor, embedFooter, moment);
    }

    if (command === `${prefix}apply`) {
        client.commands.get("apply").execute(message, discord, embedFooter);
    }

    if (command === `${prefix}application`) {
        client.commands.get("application").execute(message, discord);
    }

    if (command === `${prefix}emojify`) {
        client.commands.get("emojify").execute(message, args);
    }

    if (command === `${prefix}random`) {
        client.commands.get("random").execute(message, args);
    }

    if (command === `${prefix}help`) {
        client.commands.get("help").execute(message, args, client, discord, embedColor, embedFooter, prefix);
    }

    if (command === `${prefix}afk`) {
        client.commands.get("afk").execute(message, args);
    }

});