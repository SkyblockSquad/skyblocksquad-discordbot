module.exports = {
    name: 'profile',
    description: 'profile',
    execute(message, args, fetch) {
    
        if(args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,profile {username}");

        fetch("http://sky.shiiyu.moe/api/v2/profile/${playerName}")
        .then(response => response.json())
        .then(data => {
            let cuteName = data.cute_name.value.toLocaleString()

            return message.channel.send(`**Profile name:** ${cuteName}`);

        });

    },
};