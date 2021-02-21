module.exports = {
    name: 'profile',
    description: 'See information about your Skyblock profile!',
    category: 'Hypixel',
    execute(client, message, args, isCommand) {

        const fetch = require("node-fetch");

        if (args.length >= 3 || args.length <= 1) return message.channel.send("**Error:** Invalid syntax! Please use **,profile {username} {profile name}**");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[0]}/${args[1]}`);
            const data = await response.json();
            const { id } = data;

            if (id == null || undefined) return message.channel.send("**Error:** Something went wrong! (Unknown username or profile name)");

            message.channel.send(`**Profile ID:** __${id}__`);

        }

        getData();

    },
};