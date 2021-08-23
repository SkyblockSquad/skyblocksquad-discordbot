const discord = require("discord.js");
const fs = require("fs");

const client = new discord.Client();
client.login(process.env.token);

const botConfig = require("./data/botconfig.json");

console.log("Loading command files...");

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.aliases = new discord.Collection();

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    console.log(`Command file "${command.name}.js" has been loaded.`);

    if (!(command.aliases == undefined)) {
        command.aliases.forEach(alias => {
            client.aliases.set(alias, command.name);
        });
    }

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

client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);

    setRandomActivity();

});

client.on("message", async message => {

    var returnStatements = [];

    client.systems.forEach(system => {

        var statement = system.execute(client, message, args);

        returnStatements.push(statement);

    })

    var canContinue = true;

    returnStatements.forEach(statement => {
        if (statement == false) canContinue = false;
    });

    if (canContinue == false) return;

    if (message.channel.type === "dm") return;

    if (message.author.bot) return;

    var chance = randomChance(10);
    if (chance) setRandomActivity();

    var args = message.content.split(" ");
    var command = args[0]
    args.shift();

    if (!(message.content.startsWith(prefix))) return;

    var commands = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if (commands) commands.execute(client, message, args, true, message.channel);

});

client.on("messageReactionRemove", async (reaction, user) => {

    console.log(`eyyy whatup so uhm ${user.username} removed a reaction :/`);

});

function setRandomActivity() {

    var activities = ["skyblock", "music", "youtube", "bedwars", "server stats", "minecraft"];

    var activity = activities[Math.floor(Math.random() * activities.length)];

    var guild = client.guilds.cache.get('683205054681055233');

    if (activity === "skyblock") client.user.setActivity("Hypixel Skyblock", { type: "PLAYING" });
    if (activity === "music") client.user.setActivity("some nice music", { type: "LISTENING" });
    if (activity === "youtube") client.user.setActivity("memes on Youtube", { type: "WATCHING" });
    if (activity === "bedwars") client.user.setActivity("bedwars", { type: "COMPETING" });
    if (activity === "server stats") client.user.setActivity(`SkyblockSquad Discord stats: ${guild.memberCount} members!`, { type: "WATCHING" });
    if (activity === "minecraft") client.user.setActivity("Minecraft", { type: "PLAYING" });

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