const { 
    SlashCommandBuilder,
    roleMention, 
    PermissionFlagsBits} = require('discord.js');
// const { mongodbUsername, mongodbPassword, mongodbServer } = require('../settings');
const mongodbUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
const mongodbPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const mongodbServer = process.env.MONGODB_SERVER;

const Keyv = require('keyv');
const KeyvMongo = require('@keyv/mongo');
const role_mention = new Keyv({
    store: new KeyvMongo(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbServer}/katheryne?retryWrites=true&w=majority`),
    namespace: 'role_mention'});
const enable_mention = new Keyv({
    store: new KeyvMongo(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbServer}/katheryne?retryWrites=true&w=majority`),
    namespace: 'enable_mention'});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('genshin-role')
		.setDescription('View/Modify the role tagged in posts created by the bot!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
        .addSubcommand(subcommand => 
            subcommand
                .setName('set')
                .setDescription('Set a role to ping')
                .addRoleOption(option => 
                    option
                        .setName('role')
                        .setDescription('The role')
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('enable')
                .setDescription('Enable bot to ping role')
                .addBooleanOption(option => 
                    option
                        .setName('value')
                        .setDescription('True or false. Default - true')
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName('view')
                .setDescription('View the role for pinging')),
	async execute(interaction) {
        console.debug('Received the genshin-role command!');
        console.log(`guild id ${interaction.guildId}`);

        if (interaction.options.getSubcommand() === 'set'){
            let role = interaction.options.getRole('role');
            await role_mention.set(interaction.guildId, role.id);
            await interaction.reply({ content: `${role} was set`, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'view'){
            let role = await role_mention.get(interaction.guildId);
            let msg = role ? `${roleMention(role)} is currently set.` : 'No role has been set. Please use `\genshin-role set` to set a role!';
            await interaction.reply({ content: msg, ephemeral: true });
        } else if (interaction.options.getSubcommand() === 'enable'){
            await enable_mention.set(interaction.guildId, interaction.options.getBoolean('value'));
            let msg = `Mentioning role is currently set to ${interaction.options.getBoolean('value')}.`;
            await interaction.reply({ content: msg, ephemeral: true });
        }
	},
};