import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { connection,User } from "../database";
import * as logger from '../utils/console'
module.exports = { 
    data: new SlashCommandBuilder()
            .setName("unsubscribe")
            .setDescription("Unsubscribe to the Mailing List!"),

    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ephemeral: true})
        let user = new User({ user: interaction.member?.user.id})
        User.find({ user: interaction.member?.user.id}, (error:any, result:any[]) => {
            if (result.length)
            {
                interaction.editReply('You have been unsubscribed from the mailing list. :cry: :middle_finger:')
                connection.collection('users').deleteOne({user: interaction.member?.user.id})
                user.delete()
                logger.info(`User ${interaction.member?.user.username} unsubscribed from the Mailing List`);
            }
            else
                interaction.editReply("You are not subscribed!")
        })
    }
}