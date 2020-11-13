module.exports = {
    name: 'emojify',
    description: 'emojify',
    execute(message, args) {
    
        if(args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,emojify [text]**");

        var emojification = args.join(" ");
        var chars = emojification.split("");

        var validChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        for (let i = 0; i < chars.length; i++) {
            for(let x = 0; x < validChars.length; x++) {
                if(validChars[x] === chars[i]) chars[i] = `:regional_indicator_${chars[i]}:`;
            }
        }

        results = chars.join("");

    },
};