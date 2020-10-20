module.exports = {
    name: 'profile',
    description: 'profile',
    execute(message, args, fetch) {
    
        if(args.length >= 2 || args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,profile {username}");

        async function getData() {

            const response = await fetch(`https://api.slothpixel.me/api/skyblock/coins/${args[0]}`);
            const data = await response.json();
            const { quick_status } = data;

            let purse = quick_status.purse;
            let bank = quick_status.bank;

            message.channel.send(`Purse: ${purse} Bank: ${bank}`);

        }

        getData();

    },
};