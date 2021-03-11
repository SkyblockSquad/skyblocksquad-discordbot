module.exports = {
    name: 'skyblock',
    description: 'See the Skyblock stats of a player!',
    category: 'Hypixel',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");
        const botConfig = require("../data/botconfig.json");

        var embedColor = botConfig.embedColor;
        var embedFooter = botConfig.embedFooter;

        if (!(args.length === 2)) return message.channel.send("**Error:** Invalid syntax! Please use **,skyblock [username] [category]**!");

        async function getData() {

            message.channel.send("Loading...");

            const responseUUID = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
            const dataUUID = await responseUUID.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { uuid } = dataUUID;

            if (!(uuid)) return message.channel.send("**Error:** An error occurred!");

            var playerUUID = uuid;

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${playerUUID}`);
            const data = await response.json().catch(error => {
                message.channel.send("**Error:** An error occurred!");
            });

            const { members } = data;

            if (!(members)) return message.channel.send("**Error:** An error occurred!");

            var member = members[playerUUID];

            if (args[1].toLowerCase() === "stats") {

                var attributes = member["attributes"];

                var health = attributes["health"];
                var defense = attributes["defense"];
                var strength = attributes["strength"];
                var speed = attributes["speed"];
                var critChance = attributes["crit_chance"];
                var critDamage = attributes["crit_damage"];
                var attackSpeed = attributes["bonus_attack_speed"];
                var intelligence = attributes["intelligence"];
                var seaCreatureChance = attributes["sea_creature_chance"];
                var magicFind = attributes["magic_find"];
                var petLuck = attributes["pet_luck"];
                var trueDefense = attributes["true_defense"];
                var ferocity = attributes["ferocity"];
                var abilityDamage = attributes["ability_damage"];
                var miningSpeed = attributes["mining_speed"];
                var miningFortune = attributes["mining_fortune"];
                var farmingFortune = attributes["farming_fortune"];
                var foragingFortune = attributes["foraging_fortune"];

                var embed = new discord.MessageEmbed()
                    .setTitle(`SKYBLOCK (${args[0].toUpperCase()}) (STATS)`)
                    .setColor(embedColor)
                    .setFooter(embedFooter)
                    .setTimestamp()
                    .addFields(
                        { name: "Health", value: health, inline: true },
                        { name: "Defense", value: defense, inline: true },
                        { name: "Strength", value: strength, inline: true },
                        { name: "Speed", value: speed, inline: true },
                        { name: "Crit Chance", value: critChance, inline: true },
                        { name: "Crit Damage", value: critDamage, inline: true },
                        { name: "Attack Speed", value: attackSpeed, inline: true },
                        { name: "Intelligence", value: intelligence, inline: true },
                        { name: "Sea Creature Chance", value: seaCreatureChance, inline: true },
                        { name: "Magic Find", value: magicFind, inline: true },
                        { name: "Pet Luck", value: petLuck, inline: true },
                        { name: "True Defense", value: trueDefense, inline: true },
                        { name: "Ferocity", value: ferocity, inline: true },
                        { name: "Ability Damage", value: abilityDamage, inline: true },
                        { name: "Mining Speed", value: miningSpeed, inline: true },
                        { name: "Mining Fortune", value: miningFortune, inline: true },
                        { name: "Farming Fortune", value: farmingFortune, inline: true },
                        { name: "Foraging Fortune", value: foragingFortune, inline: true }
                    );

                message.channel.send(embed);

            } else if (args[1].toLowerCase() === "misc") {

                var treasureCaught = member["fishing_treasure_caught"];
                var deathCount = member["death_count"];

                var stats = member["stats"];

                var kills = stats["total_kills"];

                var embed = new discord.MessageEmbed()
                    .setTitle(`SKYBLOCK (${args[0].toUpperCase()}) (MISCELLANEOUS)`)
                    .setColor(embedColor)
                    .setFooter(embedFooter)
                    .setTimestamp()
                    .addFields(
                        { name: "Fishing Treasure Caught", value: treasureCaught },
                        { name: "Death Count", value: deathCount },
                        { name: "Total Kills", value: kills }
                    );

                message.channel.send(embed);

            } else {
                message.channel.send("**Error:** Unknown category! Please use one of the following: **stats, misc**");
            }

        }

        getData();

    },
};