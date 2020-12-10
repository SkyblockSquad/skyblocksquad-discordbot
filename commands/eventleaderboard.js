module.exports = {
    name: 'eventleaderboard',
    description: 'See the leaderboard of the Christmas Event!',
    execute(client, message, args) {

        if (args.length > 0) return message.channel.send("**Error:** You don't need to provide arguments!");

        var roleList = ["785071592412807180", 20, 100, "COMMON",
            "785098460764045313", 10, 100, "RARE",
            "785071932117876736", 10, 100, "RARE",
            "785086927182757908", 5, 100, "EPIC",
            "785098208761610250", 10, 10, "LEGENDARY",
            "785072139882463252", 10, 10, "LEGENDARY",
            "785088313392365588", 10, 10, "MYTHIC",
            "785072273295933442", 10, 10, "MYTHIC",
            "786640522722017400", 10, 10, "MYTHIC",
            "785090640132046858", 10, 10, "GODLY"];

        var scoresList = [];

        message.guild.members.cache.forEach(member => {
            var score = calculateEventScore(roleList, member);

            var constructor = {

                userID: member.id,
                userScore: score

            }

            scoresList.push(constructor);
        });

        scoresList.sort((a, b) => { b.userScore - a.userScore });

        var text = "**Christmas Event Leaderboard**";

        for (let i = 0; i < scoresList.length; i++) {
            text = text + `**${i + 1}.** ${scoresList[i][userID]}, ${scoresList[i][userScore]}`;
        }

        message.channel.send(text);

        function calculateEventScore(roles, member) {

            var score = 0;

            for (let i = 0; i < roles.length; i = i + 4) {

                var roleID = roles[i];
                var roleRarity = roles[i + 3];

                var hasRole = member.roles.cache.has(roleID);

                if (hasRole) {
                    if (!(roleRarity === "GODLY")) {
                        score++
                    } else {
                        score = score + 2;
                    }
                }

            }

            return score;

        }



    },
};