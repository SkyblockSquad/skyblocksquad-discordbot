module.exports = {
    name: 'emojify',
    description: '*Transform a text into emojis! Wauw!*',
    category: 'Fun & Games',
    execute(client, message, args) {

        if (args.length == 0) return message.channel.send("**Error:** Invalid syntax! Please use **,emojify [text]**");

        var emojification = args.join(" ");

        if (emojification.length > 50) return message.channel.send("**Error:** I can't emojify a text that is longer then 50 characters!");

        var chars = emojification.split("");

        var validChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        var numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

        var otherChars = ["#", "*"];
        var otherEmojis = ["hash", "asterisk"];

        for (let i = 0; i < chars.length; i++) {
            for (let x = 0; x < validChars.length; x++) {
                if (validChars[x] === chars[i].toLowerCase()) chars[i] = `:regional_indicator_${chars[i].toLowerCase()}:`;
            }

            for (let o = 0; o < numberChars.length; o++) {
                if (numberChars[o] === chars[i]) {
                    chars[i] = `:${numberWords[o]}:`;
                }
            }

            for (let n = 0; n < otherChars.length; n++) {
                if (otherChars[n] === chars[i]) {
                    chars[i] = `:${otherEmojis[n]}:`;
                }
            }
        }

        result = chars.join("");

        return message.channel.send(result);

    },
};