module.exports = {
    name: 'ping',
    description: 'ping',
    execute(message, args) {
    
        if(args.length >= 2) return message.channel.send("**Error:** No arguments need to be provided!");
        
        message.channel.send(`**Latency:** ${Date.now() - message.createdTimestamp}ms`);
        message.channel.snd(`**API Latency:** ${Math.round(client.ws.ping)}ms`);

        return;

    },
};