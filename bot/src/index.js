const { channel } = require('diagnostics_channel');
const discord = require('discord.js');
require('dotenv').config();
const path = require('dotenv').config({path: "./src/.env"})

//Intents mean the functionality of your bot
const client = new discord.Client({ intents: [
    discord.Intents.FLAGS.GUILDS, 
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MEMBERS,
]});


client.on("ready", async() => {
    const devDaoGuild = client.guilds.cache.get(process.env.GUILDID)
    const channels = await devDaoGuild.channels.fetch();
    //Show all channel without topic
    const textChannelObjArray = Array.from(channels.values()).filter(channel => channel.type == "GUILD_TEXT")
    const textChannelNameWithoutTopicArray = textChannelObjArray
        .filter(channel => !channel.topic)
        .map(channel => channel.name)
    //console.log(textChannelNameWithoutTopicArray)

    //Find the lastmessage of each channel
    //Take a long time to collect, 3-5 mins
    const textChannelMessageDateMap = new Map();
    for (const textChannel of textChannelObjArray){
        const messages = await textChannel.messages.fetch({
            limit: 1
        });
        messages.forEach((message) => {
            textChannelMessageDateMap.set(textChannel.name, message.createdTimestamp)
        })
    }
    //console.log(textChannelMessageDateMap)
})


client.login(process.env.TOKEN);