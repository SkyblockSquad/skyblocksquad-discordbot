module.exports = {
    name: 'pingchrissy',
    description: 'Ping Chrissygamer101! (Spam is allowed)',
    category: 'Miscellaneous',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        var pingChannel = message.guild.channels.cache.get("815630440962588722");
        pingChannel.send("<@622084290125234195>");

    },
};