module.exports = {
    name: 'badges',
    description: '*See all of a users badges!*',
    category: 'Information',
    aliases: [],
    execute(client, message, args) {

        const discord = require("discord.js");

        client.users.fetch();

        console.log(client.users.size);

    },
};