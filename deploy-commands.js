const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
// const { clientId, token } = require('./settings.json');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filepath = path.join(commandsPath, file);
	const command = require(filepath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => {
        console.log('Successfully registered application commands.');
        // comment out this line if your commands aren't deploying properly
        // doing this only because of the mongodb atlas bug
        process.exit(0);
    })
    .catch(console.error);