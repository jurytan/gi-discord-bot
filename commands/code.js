const { 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
    userMention,
    roleMention } = require('discord.js');
const { mongodbUsername, mongodbPassword, mongodbServer } = require('../settings');
const Keyv = require('keyv');
const KeyvMongo = require('@keyv/mongo');
const config = new Keyv({
    store: new KeyvMongo(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbServer}/katheryne?retryWrites=true&w=majority`),
    namespace: 'config'});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Embed a code from Hoyoverse for easy access!')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Code to embed')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('What it contains')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of primos')
                .setRequired(false)),
	async execute(interaction) {
        console.debug('Received the code command!');

        let url = "https://genshin.hoyoverse.com/en/gift?code=" + interaction.options.get('code').value;
        let userId = interaction.user.id;
        let username = interaction.user.username;
        let roleId = await config.get(interaction.guildId);

        const message = (roleId ? `${roleMention(roleId)}:` : '') 
            + `A new Genshin Impact code is available for you! Thanks to ${userMention(userId)} for the code!`;

        const embedResponse = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Genshin Impact Code')
            .setAuthor({ name: `Katheryne (w/ help from ${username}!)`, iconURL: 'https://www.nautiljon.com/images/jeuxvideo_persos/00/98/katheryne_4989.jpg' })
            .setDescription(interaction.options.get('message').value)
            .setThumbnail('https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png')
            .addFields({ name: 'Hoyoverse Code', value: interaction.options.get('code').value, inline: true })
            .setTimestamp()
            .setFooter({ text: 'Ad Astra Abyssosque!' });

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Redeem ${interaction.options.get('amount').value} primogems`)
                    .setURL(url)
                    .setStyle(ButtonStyle.Link),
            );

		await interaction.reply({ content: message, embeds: [embedResponse], components: [button] });
	},
};