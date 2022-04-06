const distube = require('../index.js');
const { MessageEmbed } = require("discord.js");
const { EMOJI_DONE ,EMOJI_ERROR } = require("../config.json")
module.exports = {
    name: "join",
    aliases: ["j", "247", "24/7", "24x7"],
    description: "Join your VC for 27/7",
    async execute(message, args) {
        const { channel } = message.member.voice;
    
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) return message.reply(` No estas en un canal de voz`).catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
          return message.reply(` Debes estar en el mismo canal que ${message.client.user}`).catch(console.error);


          

            await message.member.voice.channel.join()
            return message.react();
        }
    }


    console.log("Join funcionando")