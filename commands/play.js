const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const https = require("https");
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, DEFAULT_VOLUME } = require("../config.json");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
const { EMOJI_DONE } = require('../config.json');

module.exports = {
  name: "play",
  aliases: ["p"],
  cooldown: 3,
  description: "Plays audio from YouTube",
  async execute(message, args) {
    const { channel } = message.member.voice;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!channel) return message.reply("¡Primero debes unirte a un canal de voz!").catch(console.error);
    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`Debes estar en el mismo canal que ${message.client.user}`).catch(console.error);

    if (!args.length)
      return message
        .reply(`Usage: **${message.client.prefix}play <URL de YouTube Music | Nombre de la canción >**`)
        .catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("No se puede conectar al canal de voz, faltan permisos");
    if (!permissions.has("SPEAK"))
      return message.reply("No puedo hablar en este canal de voz, ¡asegúrate de tener los permisos adecuados!");

    const search = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);

    // Start the playlist if playlist url was provided
    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.client.commands.get("playlist").execute(message, args);
    } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
      return message.client.commands.get("playlist").execute(message, args);
    }

    if (mobileScRegex.test(url)) {
      try {
        https.get(url, function (res) {
          if (res.statusCode == "302") {
            return message.client.commands.get("play").execute(message, [res.headers.location]);
          } else {
            return message.reply("No se pudo encontrar contenido en esa URL.").catch(console.error);
          }
        });
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
      return message.reply("un segundo...").catch(console.error);
    }

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: DEFAULT_VOLUME || 100,
      playing: true
    };

    let songInfo = null;
    let song = null;

    if (urlValid) {
      try {
        songInfo = await ytdl.getInfo(url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else if (scRegex.test(url)) {
      try {
        const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
        song = {
          title: trackInfo.title,
          url: trackInfo.permalink_url,
          duration: Math.ceil(trackInfo.duration / 1000)
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        const results = await youtube.searchVideos(search, 1);
        songInfo = await ytdl.getInfo(results[0].url);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          duration: songInfo.videoDetails.lengthSeconds
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      return serverQueue.textChannel
        .send(` - **${song.title}** ha sido añadido a la lista`)
        .catch(console.error);
    }


    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(error);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(`No se pudo unir al canal: ${error}`).catch(console.error);
      
    }
  }
};



console.log("Play cmd funcionando")