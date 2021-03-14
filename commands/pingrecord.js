module.exports = {
    name: 'pingchrissy',
    description: 'Ping Chrissygamer101!',
    category: 'Miscellaneous',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        if (!(message.channel.id === "815982460637806652")) return message.channel.send("**Error:** You can only use this command in <#815982460637806652>!");

        message.guild.channels.cache.get("820610719263359026").send("<@526799167549472771>");

        setTimeout(function () {
            message.delete();
        }, 3000)

    },
};