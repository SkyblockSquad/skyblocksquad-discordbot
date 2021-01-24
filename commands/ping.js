module.exports = {
    name: 'ping',
    description: 'Get information about latency and API ping!',
    category: 'Information',
    execute(client, message, args) {

        if (args.length >= 1) return message.channel.send("**Error:** No arguments need to be provided!");

        return message.channel.send(`:ping_pong: **Latency:** ${Date.now() - message.createdTimestamp}ms\n**API Latency:** ${Math.round(client.ws.ping)}ms`);

    },
};