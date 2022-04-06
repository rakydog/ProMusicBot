const { canModifyQueue } = require("../config.json");
const { EMOJI_DONE } = require('../config.json');

module.exports = {
  name: "stop",
  aliases: ["stop",],
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("No hay nada reproduciendo.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(` se paró la música!`).catch(console.error);

    return message.react();
  }
};


console.log("stop funcionando")