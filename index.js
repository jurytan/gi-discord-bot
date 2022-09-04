const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./settings');
const client = new Client({ intents: [GatewayIntentBits.MessageContent]});

client.once('ready', () => console.log('---[jurytan] Genshin Impact Discord bot ready to go!'));

client.on('message', (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith('!code')) {
        // implement this later
        console.log('Received the code command!');
    }
})

client.login(token);


function embedCode(codes) {
    // implement later
}