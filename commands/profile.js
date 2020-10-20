module.exports = {
    name: 'profile',
    description: 'profile',
    execute(message, args, fetch) {
    
        if(args.length >= 3 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,profile {username} {profile name}");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/profile/${args[0]}/${args[1]}`);
            const data = await response.json();
            const { id } = data;

            message.channel.send(`**Profile ID:** __${id}__`);

        }

        getData();

    },
};