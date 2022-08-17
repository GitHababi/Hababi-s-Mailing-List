import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, EmbedAssertions, Attachment } from "discord.js";
import { posts, User, Post, ViewSession } from "../database";
import { client } from '../index';
import * as logger from '../utils/console'
import { attachmentIsVideo } from '../utils/files'
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
        if (interaction.user.id !== process.env.adminUserId)
            return    
        await interaction.deferReply({ephemeral : true})
            
        const title = interaction.options.getString('title');
        const attachment = interaction.options.getAttachment('attachment')?.proxyURL ?? '';
        const embed = new EmbedBuilder()
                        .setTitle(title)
                        .setImage(attachment)
        logger.info(`Meme sending: ${title}`)   
        let post = new Post({title: title, attachment: attachment, timestamp: Date.now()})
        post.save()
        posts.push(post)
        interaction.editReply('Sending...')
        User.find().then((users) => {    
            for (const user of users) {
                client.users.fetch(user.user).then((target) => {
                    target.createDM().then((dm) => {
                        dm.send({ embeds: [embed] })
                          .catch((error) => {
                            interaction.followUp('An error ocurred, check output terminal for more info.')
                            logger.error(`Failed to send ${target.username} ${title}. ${error.message}\n${error.error}`)
                          })
                        if (attachmentIsVideo(attachment))
                          dm.send(attachment)
                    })
                })
            }
        })
        ViewSession.deleteMany({});
    }
}