const { canModifyQueue } = require("../config.json");
const {EMOJI_DONE} = require('../config.json');
module.exports = {
  name: "skip",
  aliases: ["skip"],
  description: "Skip the currently playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("No hay nada de reproducir que pueda omitir para ti.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`se saltó la canción`).catch(console.error);

     return message.react();
  }
};


console.log("skip funcionando")