module.exports = {
    name: 'apps',
    description: 'Manage applications',
    execute(client, message, args) {
    
        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");
    
        var staffManager = message.member.roles.cache.find(role => role.id === "729202553870483498");
        var guildMaster = message.member.roles.cache.find(role => role.id === "683205412488478809");
        
        if (!staffManager && !guildMaster) {
            return message.channel.send("**Error:**  Insufficient permissions");
        }
        
        var embed = new discord.MessageEmbed()
            .setTitle("Application Management")
            .setDescription("Manage applications with the below commands");
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                { name: "**,apps open**", value: "Open staff applications" },
                { name: "**,apps close**", value: "Close staff applications" }
            );
            
        return message.channel.send(embed);
    },
};
