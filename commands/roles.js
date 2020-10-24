module.exports = {
    name: 'roles',
    description: 'roles',
    execute(message, args) {
    
        const database = require("../database.json");
        const mysql = require("mysql");

        var con = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.password,
            database: database.database
        });

        con.connect(err => {
            if(err) console.log(err);
        });

        var user = message.guild.member(message.mentions.users.first());
        var roleName = args[1];
        var remove = args[2];

        if(roleName) {
            var roleInfo = message.guild.roles.cache.find(r => r.name === roleName);
            if(!roleInfo) return message.channel.send("**Error:** Role doesn't exist!");
            var roleID = roleInfo.id;
        }

        if(user && !roleName) {

        } else if(user && roleName && !remove) {
            
            con.query(`SELECT * FROM roles WHERE UserID = '${user.id}' AND RoleID = '${roleID}'`,(err, rows) => {

                if(err) console.log(err);

                if(rows.length > 0) {
                    return message.channel.send("**Error:** This user already has this role!");
                } else {
                    con.query(`INSERT INTO roles (UserID, RoleID) VALUES ("${user.id}","${roleID}")`);
                    user.roles.add(roleID);
                    return message.channel.send("**Succesfully added role!**");
                }

            });

        } else if(user && roleName && remove === "remove") {

        } else {
            message.channel.send("**Error:** Invalid syntax!");
        }

    },
};