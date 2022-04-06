
const { EMOJI_DONE } = require('../config.json');

module.exports = {
    name: "leave",
    aliases: ["leee", "leave"],
    description: "Leaves VC",
    async execute(message, args) {
        const { channel } = message.member.voice;
    
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) return message.reply("¡Necesitas unirte a un canal de voz en el que estoy - para desconectarme!").catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
          return message.reply(`Debes estar en el mismo canal que
${message.client.user}`).catch(console.error);

            message.member.voice.channel.leave();
            
           
            message.react();
        }
    }



    console.log("DC / Disconnect funcionando")