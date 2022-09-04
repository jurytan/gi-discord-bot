const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Embed a code from Hoyoverse for easy access!')
        .addStringOption(option =>
            option.setName('code_1')
                .setDescription('First code to embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('code_2')
                .setDescription('Second code to embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('code_3')
                .setDescription('Third code to embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('code_4')
                .setDescription('Fourth code to embed')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('code_5')
                .setDescription('Fifth code to embed')
                .setRequired(false)),
	async execute(interaction) {
        console.log('Received the code command!');
		await interaction.reply('Received the code command!');
	},
};