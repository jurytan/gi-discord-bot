const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
// const { token } = require('./settings');

const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.MessageContent]});
const guilds = client.guilds.cache.map(guild => guild.id);


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    // console.debug(file);
    const filepath = path.join(commandsPath, file);
	const command = require(filepath);
	client.commands.set(command.data.name , command);
}

console.debug(client.commands);

client.once('ready', () => console.log('---[jurytan] Genshin Impact Discord bot ready to go!'));

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
    // console.debug(interaction);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
