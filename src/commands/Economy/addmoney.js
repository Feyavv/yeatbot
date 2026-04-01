import { SlashCommandBuilder } from 'discord.js';
import { addMoney } from '../../services/economy.js';

export default {
    data: new SlashCommandBuilder()
        .setName('addmoney')
        .setDescription('Add money to a user (ADMIN ONLY)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to give money to')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount of money')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        // 🔒 ADMIN CHECK
        if (interaction.user.id !== 'YOUR_DISCORD_ID') {
            return interaction.reply({ 
                content: '❌ You are not allowed to use this command.', 
                ephemeral: true 
            });
        }

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        const result = await addMoney(
            client,
            interaction.guild.id,
            user.id,
            amount
        );

        if (!result.success) {
            return interaction.reply(`❌ Error: ${result.error}`);
        }

        return interaction.reply(
            `✅ Added **${amount}** coins to ${user.username}\n💰 New balance: ${result.newBalance}`
        );
    }
};
