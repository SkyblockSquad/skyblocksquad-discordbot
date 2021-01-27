module.exports = {
    name: 'Skyblock Updates',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        if (!(message.channel.id === "757218179113156669")) return true;

        if (!(message.webhookID)) return true;

        setTimeout(function() {

            if(message.content.includes("@SkyBlock News")) {
                message.channel.send("[<@&717993991773356145>]");
            } else if(message.content.includes("@SkyBlock Content Change")) {
                message.channel.send("[<@&770715385657950218>]");
            } else if(message.content.includes("@SkyBlock Leaks")) {
                message.channel.send("[<@&770715385657950218>]");
            }

        }, 1500);

        return true;

    },
};