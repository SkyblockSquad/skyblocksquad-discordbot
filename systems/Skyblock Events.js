module.exports = {
    name: 'Skyblock Events',
    execute(client, message, args) {

        if (message.channel.type === "dm") return;

        if (!(message.channel.id === "774544902569590796")) return;

        if (!(message.author.bot)) return;

        if (!(message.author.id === "649604306596528138")) return;

        setTimeout(function () {

            message.channel.send("[<@&746261958302367766>]");

        }, 3000)

    },
};