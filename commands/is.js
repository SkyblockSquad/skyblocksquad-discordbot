module.exports = {
    name: 'is',
    description: 'is',
    execute(message, args) {

            if(message.channel.type == "dm") {
                message.channel.send('**Error:** This command can not be used in DM!');
                return;
            }
    
            if(args.length < 3) {
                message.channel.send('**Error:** This command has a minimum of 3 arguments!');
                return;
            }
    
            var randomOptions = ["I think yes, but I'm not completely sure.", "no", "Nobody knows!", "Sorry, I'm too lazy too answer.", "*akward silence*",
                                "*visible confusion*", "*insert joke here*", "Oops! My brain exploded while thinking about your question!",
                                "**Error:** An error has occurred while trying to perform this commannd!", "How about no?", "function: thumbsdown", "You are no longer **OP**",
                                "You are now **BANNED**", "function: no internet", "**Error:** You don't have permission to use this command!", "function: ping alert",
                                "function: wrong chat", "function: delete message", "(._.)", ".", "function: fake ping", "yes",
                                "Do I smell a bad question?", "Sorry I don't know :("]

            var randomInteger = Math.floor(Math.random() * randomOptions.length);
            var randomOption = randomOptions[randomInteger]
    
            if(randomOption === "function: thumbsdown") {
                message.react("👎");
                return;
            }
    
            if(randomOption === "function: no internet") {
                message.channel.send("Let me think about that...");
                
                setTimeout(function(){ 
                    message.channel.send("My internet doesn't work so I can't acces Google, sorry!")
                 }, 2000);
                 
                 return;
    
            }
    
            if(randomOption === "function: ping alert") {
                message.channel.send("**PING ALERT!!!**");
    
                setTimeout(function(){
                    message.channel.send(`<@${message.author.id}>`)
                }, 2000);
    
                return;
    
            }
    
            if(randomOption === "function: wrong chat") {
                message.channel.send("Hey Ultra, somebody is asking me something but I don't know the answer could you tell me? :)");
    
                setTimeout(function(){
                    message.channel.send("Oops, wrong chat");
                }, 1000);
    
                return;
    
            }
    
            if(randomOption === "function: delete message") {
                message.delete();
                message.channel.send("Where's your message now? Oops! >:)");
                return;
            }
            
            if(randomOption === "function: fake ping") { 
                message.channel.send("**PING ALERT!**");
                
                setTimeout(function(){
                    message.channel.send("Lol it's fake")
                }, 2000);
                return;
    
            }
      
            message.channel.send(randomOption);
            return;

    },
};