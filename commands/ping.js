const { EMOJI_ARROW} = require('../config.json');

module.exports = {
  name: "ping",
  aliases: ["pong"],
  cooldown: 10,
  description: "Show the bot's average ping",
  execute(message) {
    message.reply(`$ Ping promedio a la API: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};


console.log("Ping funcionando")