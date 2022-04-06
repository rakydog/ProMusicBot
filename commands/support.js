const { MessageEmbed } = require("discord.js");
const { SERVER_INVITE , BOT_ID } = require('../config.json');


module.exports = {
  name: "support",
  aliases: ["bug","suggest","suggestion","report","soporte"],
  description: "To get support server of bot or report some issue (bug)",
  execute(message, args) {
   
    let support = new MessageEmbed()
      .setTitle(`**Support**`)
      .setDescription(
          
        `Apoyo para <@${BOT_ID}>,
        

        Únase a nuestro servidor de soporte [CLICK HERE](${SERVER_INVITE})`
        
      )
      .setURL(
        `${SERVER_INVITE}`
      )
      .setColor("RED");
    return message.channel.send(support);
  }
};


console.log("support funcionando")