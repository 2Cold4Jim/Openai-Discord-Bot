require("dotenv").config();
const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

//Open AI keys
const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    organization:"PASTE ORGANIZATION KEY HERE",
    apiKey:"PASTE APIKEY HERE"
});
const openai = new OpenAIApi(configuration)

client.on('messageCreate',async function(message){
    try{
        //Returns if bot response
        if(message.author.bot) return;
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",//This is the model, you can change it but make sure your using a model that doesn't need to store mesg data
            prompt: `${message.author.username}: ${message.content}`,
            temperature: 0.4,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["ChatGPT:", "PUT YOUR OPENAI USERNAME HERE"],
        })
            message.reply(`${gptResponse.data.choices[0].text}`);
            return;
    }catch (err){
        console.log(err)
    }
})

//Log the bot into Discord
client.login("PASTE DISCORD CLIENT KEY");
console.log("Bot is Online on Discord");//This is the msg that displays when the bot comes online, feel free to change it
