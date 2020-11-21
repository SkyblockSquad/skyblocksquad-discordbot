module.exports = {
    name: 'afk',
    description: '*Toggle afk mode! (Level 15+ only)*',
    category: 'Miscellaneous',
    execute(message, args) {

        if(args.length > 0) return message.channel.send("**Error:** You don't need to provide arguments!");

        var level15role = message.member.roles.cache.find(role => role.id === "773453879689740288");
        var level20role = message.member.roles.cache.find(role => role.id === "773454008974704650");
        var level25role = message.member.roles.cache.find(role => role.id === "773454133557592094");
        var level30role = message.member.roles.cache.find(role => role.id === "773454210166554646");
        var level35role = message.member.roles.cache.find(role => role.id === "773454351787753473");
        var level40role = message.member.roles.cache.find(role => role.id === "773454498160181259");
        var level45role = message.member.roles.cache.find(role => role.id === "773454622190600222");
        var level50role = message.member.roles.cache.find(role => role.id === "773454761503490098");

        if (!level15role && !level20role && !level25role && !level30role && !level35role && !level40role && !level45role && !level50role) {
            return message.channel.send("**Error:** You must be atleast **level 15** or higher to do this!");
        }

        var afkRole = message.member.guild.roles.cache.get('779718452075954197');

        if(!afkRole) message.channel.send("**Error:** Couldn't find the AFK role! Please message a bot developer!");

        var isAFK = message.member.roles.cache.find(role => role.id === "779718452075954197");

        if(!isAFK) {

            message.member.roles.add(afkRole);
            message.channel.send("AFK mode is now **enabled**!");

        } else {

            message.member.roles.remove(afkRole);
            message.channel.send("AFK mode is now **disabled**!");

        }

    },
};