const discord = require("discord.js");
const fs = require("fs");

const client = new discord.Client();
client.login(process.env.token);

console.log("Loading data files...");

const botConfig = require("./data/botconfig.json");
console.log("Data file \"botconfig.json\" has been loaded.");

var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));
console.log("Data file \"swearWords.json\" has been loaded.");

const dataFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
console.log(`${dataFiles.length} data files have been loaded.`);

console.log("Loading command files...");

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`Command file "${command.name}.js" has been loaded.`);

}

console.log(`${commandFiles.length} command files have been loaded.`);

console.log("Loading system files...");

client.systems = new discord.Collection();
const systemFiles = fs.readdirSync('./systems').filter(file => file.endsWith('.js'));

for (const file of systemFiles) {

    const system = require(`./systems/${file}`);
    client.systems.set(system.name, system);

    console.log(`System file "${system.name}.js" has been loaded.`)

}

console.log(`${systemFiles.length} system files have been loaded.`);

var prefix = botConfig.prefix;
var embedFooter = botConfig.embedFooter;

client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);

    setRandomActivity();

});

client.on("message", async message => {

    if (message.channel.type === "dm") return;

    if (message.author.bot && message.author.id === "715568351052693622") {
        var roleCheck = message.guild.me.roles.cache.get('780104794756218920');
        if (!roleCheck) {
            var botRole = message.guild.roles.cache.get('780104794756218920');
            if (botRole) {
                message.guild.me.roles.add(botRole)
            } else {
                console.log("Couldn't find the SkyblockSquad Bot role! Has it been deleted?");
            }
        }
    }

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
                .setColor("#FF0000")
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
            .setColor("#FF0000")
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

    if (message.mentions.users.size > 0) {

        message.mentions.users.forEach(m => {

            var afkRole = message.guild.members.cache.get(m.id).roles.cache.find(role => role.id === "779718452075954197");

            if (afkRole) {
                message.channel.send(`**${m.username}** is currently AFK!`);
            }

        })

    }

    var chance = randomChance(10);
    if (chance) setRandomActivity();

    var args = message.content.split(" ");
    var command = args[0]
    args.shift();

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.execute(client, message, args);

});

function setRandomActivity() {

    var activities = ["skyblock", "music", "youtube", "bedwars", "server stats"];

    var activity = activities[Math.floor(Math.random() * activities.length)];

    var guild = client.guilds.cache.get('683205054681055233');

    if (activity === "skyblock") client.user.setActivity("Hypixel Skyblock", { type: "PLAYING" });
    if (activity === "music") client.user.setActivity("some nice music", { type: "LISTENING" });
    if (activity === "youtube") client.user.setActivity("memes on Youtube", { type: "WATCHING" });
    if (activity === "bedwars") client.user.setActivity("bedwars", { type: "COMPETING" });
    if (activity === "server stats") client.user.setActivity(`SkyblockSquad Discord stats: ${guild.memberCount} members!`, { type: "WATCHING" });

}

function randomInteger(minimum, maximum) {

    var random = Math.floor(Math.random() * maximum + 1);

    for (let i = 0; true; i++) {
        if (random < minimum) {
            random = Math.floor(Math.random() * maximum + 1);
        } else {
            break;
        }
    }

    return random;

}

// Requires function randomInteger
function randomChance(percentage) {

    var calc = 100 / percentage;

    var random = randomInteger(1, Math.round(calc));

    if (random == 1) {
        return true;
    } else {
        return false;
    }

}