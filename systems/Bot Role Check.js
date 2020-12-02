module.exports = {
    name: 'Bot Role Check',
    execute(client, message, args) {

        if (message.channel.type === "dm") return;

        var roleInServer = message.guild.roles.cache.get("780104794756218920");

        if(!(roleInServer)) return console.log("Oops! Couldn't find the SkyblockSquad Bot role!");
        
        var roleInBot = message.guild.me.roles.cache.has("780104794756218920");

        if(!roleInBot) {
            message.guild.me.roles.add(roleInServer);
        }

    },
};