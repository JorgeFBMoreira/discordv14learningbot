import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Add a role')
    .addRoleOption((option) => 
        option
            .setName('newrole')
            .setDescription('Adds the New Role')
    )

export default rolesCommand.toJSON();