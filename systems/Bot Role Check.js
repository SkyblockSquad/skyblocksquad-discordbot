module.exports = {
    name: 'Bot Role Check',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        var roleInServer = message.guild.roles.cache.get("780104794756218920");

        if (!(roleInServer)) {
            console.log("Oops! Couldn't find the SkyblockSquad Bot role!");
            return true;
        }

        var roleInBot = message.guild.me.roles.cache.has("780104794756218920");

        if (!roleInBot) {
            message.guild.me.roles.add(roleInServer);
        }

        return true;

    },
};