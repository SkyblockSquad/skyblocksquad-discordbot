module.exports = {
    name: 'Skyblock Events',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        if (!(message.channel.id === "774544902569590796")) return true;

        if (!(message.author.bot)) return true;

        if (!(message.author.id === "649604306596528138")) return true;

        setTimeout(function () {

            message.channel.send("[<@&746261958302367766>]");

        }, 3000)

        return true;

    },
};