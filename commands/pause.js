const { canModifyQueue } = require("../config.json");
const {EMOJI_DONE} = require('../config.json');
module.exports = {
  name: "pause",
  aliases: ["P"],
  description: "Pause the currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada puesto aquí.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`se pausó la música.`).catch(console.error) , message.react();

       
    }
  }
};



console.log("Pause funcioando")