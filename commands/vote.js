
const { MessageEmbed } = require("discord.js");
const { COLOR } = require('../config.json');
const { EMOJI_DONE , BOT_ID  } = require('../config.json');

module.exports = {
  name: "vote",
  aliases: ["vote"],
  description: "To get vote link of our bot , please vote us!",
  execute(message, args) {
   
    let vote = new MessageEmbed()
      .setTitle(`**Vote**`)
      .setDescription(
        

        `votame por favor!\n\nLink: [Click Here](https://top.gg/bot/${BOT_ID}/vote) gracias por adelantado`
        
      )
      .setURL(
        `https://top.gg/bot/${BOT_ID}/vote`
      )

      
      .setColor(COLOR);
    return message.channel.send(vote) , message.react();
       
  }

};
console.log("vote funcionando")