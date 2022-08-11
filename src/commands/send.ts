import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, EmbedAssertions, Attachment } from "discord.js";
import { connection,User } from "../database";
import { client } from '../index';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Send and embedded image/video to all subscribers')
        .addAttachmentOption(option =>
            option.setName('attachment')
                  .setDescription('The attachment to be embedded') 
                  .setRequired(true))
        .addStringOption(option => 
            option.setName('title')
                  .setDescription('Title of the embed')
                  .setRequired(true)),
    execute: async (interaction: ChatInputCommandInteraction) => {
        
        await interaction.deferReply({ephemeral : true})
        
        if (interaction.user.id !== process.env.adminUserId)
            return
        const title = interaction.options.getString('title');
        const attachment = interaction.options.getAttachment('attachment')?.proxyURL ?? '';
        const embed = new EmbedBuilder()
                        .setTitle(title)
                        .setImage(attachment)
        interaction.editReply('Sending...')
        User.find().then((users) => {    
            for (const user of users) {
                client.users.fetch(user.user).then((target) => {
                    target.createDM().then((dm) => {
                        dm.send({ embeds: [embed] })
                          .catch((error) => {
                            interaction.followUp('An error ocurred, check output terminal for more info.')
                            console.error(`[\x1b[31mHML\x1b[37m] Error: Failed to send ${target.username} ${title}. ${error.message}\n${error.error}`)
                          })
                    })
                })
            }
        })
        
    }
}