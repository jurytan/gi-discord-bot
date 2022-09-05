const { 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
    roleMention } = require('discord.js');

// add your role id for Genshin Impact codes here
// let roleId = '844710239571410954'; // The Domain of Jury
let roleId = '1016205852849483836';  // Jurys Bot Land

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
        console.debug('code', interaction.options.get('code'));
        console.debug('message', interaction.options.get('message'));
        console.debug('amount', interaction.options.get('amount'));
        console.debug('username', interaction)

        let url = "https://genshin.hoyoverse.com/en/gift?code=" + interaction.options.get('code').value;
        let userId = interaction.user.id;
        let username = interaction.user.username;

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

		await interaction.reply({ content: `${roleMention(roleId)}`, embeds: [embedResponse], components: [button] });
	},
};