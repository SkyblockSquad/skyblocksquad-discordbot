module.exports = {
    name: 'tier',
    description: 'See which tier you are in the event!',
    category: 'Miscellaneous',
    aliases: [],
    execute(client, message, args, isCommand, channel) {

        const eventRoles = require("../data/eventRoles.json");

        // Get all the tier roles
        var hasT1Role = message.member.roles.cache.get(eventRoles["tier1"][0]);
        var hasT2Role = message.member.roles.cache.get(eventRoles["tier2"][0]);
        var hasT3Role = message.member.roles.cache.get(eventRoles["tier3"][0]);
        var hasT4Role = message.member.roles.cache.get(eventRoles["tier4"][0]);
        var hasT5Role = message.member.roles.cache.get(eventRoles["tier5"][0]);
        var hasT6Role = message.member.roles.cache.get(eventRoles["tier6"][0]);

        // Get the player's current tier
        var currentTier = 0

        if (hasT1Role) currentTier = 1;
        if (hasT2Role) currentTier = 2;
        if (hasT3Role) currentTier = 3;
        if (hasT4Role) currentTier = 4;
        if (hasT5Role) currentTier = 5;
        if (hasT6Role) currentTier = 6;

        message.channel.send(`You are currently **tier ${currentTier}**!`);

    },
};