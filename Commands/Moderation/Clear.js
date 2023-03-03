const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');
const Transcripts = require('discord-html-transcripts');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Bulk delete messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false)
        .addNumberOption((options) => options
            .setName('amount')
            .setDescription('Provide the amount of messages you intent to delete.')
            .setMinValue(2)
            .setMaxValue(100)
            .setRequired(true)
        )
        .addStringOption((options) => options
            .setName('reason')
            .setDescription('Provide the reason to why you are clearing these messages.')
            .setRequired(true)
        )
        .addUserOption((options) => options
            .setName('target')
            .setDescription('Provide the target member to only delete their messages.')
        ),

    /**
     * 
     * @param { ChatInputCommandInteraction } interaction 
     */
    async execute(interaction) {
        const { options, channel, guild, member } = interaction;

        const Amount = options.getNumber('amount');
        const Reason = options.getString('reason');
        const Target = options.getUser('target');

        const channelMessages = await channel.messages.fetch();
        const logChannel = guild.channels.cache.get('1081229851534557245');

        const responseEmbed = new EmbedBuilder().setColor('DarkNavy');
        const logEmbed = new EmbedBuilder()
            .setColor('DarkAqua')
            .setAuthor({ name: 'CLEAR COMMAND USED' });

        let logEmbedDescription = [
            `• Moderator: ${member}`,
            `• Target: ${Target || 'None'}`,
            `• Channel: ${channel}`,
            `• Reason: ${Reason}`,
        ];

        if(Target) {
            let i = 0;
            let messagesToDelete = [];

            channelMessages.filter((message) => {
                if(message.author.id === Target.id && Amount > i) {
                    messagesToDelete.push(message);
                    i++;
                };
            });
            
            const Transcript = await Transcripts.generateFromMessages(messagesToDelete, channel);

            channel.bulkDelete(messagesToDelete, true).then((messages) => {
                interaction.reply({
                    embeds: [responseEmbed.setDescription(`🧹 Cleaned \`${messages.size}\` messages from ${Target}`)],
                    ephemeral: true
                });
                
                logEmbedDescription.push(`• Total Messages: ${messages.size}`);
                logChannel.send({
                    embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))],
                    files: [Transcript]
                });
            });
        } else {
            const Transcript = await Transcripts.createTranscript(channel, { limit: Amount });

            channel.bulkDelete(Amount, true).then((messages) => {
                interaction.reply({
                    embeds: [responseEmbed.setDescription(`🧹 Cleaned \`${messages.size}\` messages.`)],
                    ephemeral: true
                });
                
                logEmbedDescription.push(`• Total Messages: ${messages.size}`);
                logChannel.send({
                    embeds: [logEmbed.setDescription(logEmbedDescription.join('\n'))],
                    files: [Transcript]
                });
            });
        };

        console.log('Finished deleting messages');
    }
};