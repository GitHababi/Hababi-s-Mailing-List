import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { connection,User } from "../database";
import * as logger from '../utils/console'
module.exports = { 
    data: new SlashCommandBuilder()
            .setName("removesubscriber")
            .setDescription("Unsubscribe to the Mailing List!")
            .addUserOption(option =>
                option.setName('subscriber')
                      .setDescription('The user to remove from the mailing list')
                      .setRequired(true)),

    execute: async (interaction: ChatInputCommandInteraction) => {
        if (interaction.user.id !== process.env.adminUserId)
            return
        await interaction.deferReply({ephemeral: true})

        const subscriber = interaction.options.getUser('subscriber')
        const id = subscriber?.id

        let user = new User({ user: id })
        User.find({ user: id }, (error:any, result:any[]) => {
            if (result.length)
            {
                interaction.editReply('Removed member from mailing list.')
                connection.collection('users').deleteOne({user: id})
                user.delete()
                logger.info(`User ${subscriber?.username} unsubscribed from the Mailing List`);
            }
            else
                interaction.editReply("User is not subscribed!")
        })
    }
}