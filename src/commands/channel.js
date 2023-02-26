import { SlashCommandBuilder } from '@discordjs/builders';

const channelsCommand = new SlashCommandBuilder()
    .setName('channels')
    .setDescription('Channels CMD')
    .addChannelOption((option) => 
        option
            .setName('channel')
            .setDescription('Channel')
            .setRequired(true)
    )
    .addBooleanOption((option) => 
        option
            .setName('deletemessages')
            .setDescription('Delete all Messages')
            .setRequired(true)
    )
    .addIntegerOption((option) =>
        option
            .setName('age')
            .setDescription('Enter your age')
    )
    .addAttachmentOption((option) =>
        option
            .setName('file')
            .setDescription('file')
    )

export default channelsCommand.toJSON();