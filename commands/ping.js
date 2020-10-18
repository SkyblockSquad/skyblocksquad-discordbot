module.exports = {
    name: 'ping',
    description: 'ping',
    execute(message, args, client) {
    
        if(args.length >= 2) return message.channel.send("**Error:** No arguments need to be provided!");

        message.channel.send("Waiting for server...").then(m =>{

            m.edit(`**Latency:** ${Date.now() - message.createdTimestamp}ms\n**API Latency:** ${Math.round(client.ws.ping)}ms`);
            return;
            
        });

    },
};