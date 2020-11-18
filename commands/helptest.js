module.exports = {
    name: 'helptest',
    description: '*This description shows\nwhen to use the\nnewline symbol!*',
    category: 'Information',
    execute(message, client) {

        var commandList = [];

        client.commands.forEach(command => {

            var constructor = {

                name: command.name,
                description: command.description,
                category: command.category

            }

            commandList.push(constructor);



        });

        var informationAmount = 0;

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Information") {

                informationAmount++;

            }

        }

        message.channel.send(`**DEBUG:** var informationAmount = ${informationAmount}`);
        message.channel.send(commandList);

    },
};