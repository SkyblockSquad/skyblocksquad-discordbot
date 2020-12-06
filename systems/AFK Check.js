module.exports = {
    name: 'AFK Check',
    execute(client, message, args) {

        if (message.channel.type === "dm") return true;

        if (message.author.bot) return true;

        if (!(message.mentions.users.size > 0)) return true;

        message.mentions.users.forEach(m => {

            var isAFK = message.guild.members.cache.get(m.id).roles.cache.has("779718452075954197");

            if (isAFK) {
                message.channel.send(`**${m.username}** is currently AFK!`).then(msg => msg.delete({ timeout: 5000 }));
            }

        })

        return true;

    },
};