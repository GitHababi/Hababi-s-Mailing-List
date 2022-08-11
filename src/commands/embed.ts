import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { userInfo } from "os";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Embed"),

    execute: async (interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ ephemeral: true })
        const embed = new EmbedBuilder()
            .setTitle("embed")
            .setImage("https://cdn.discordapp.com/attachments/570851207002980362/1007108431146127460/Eiyt3aYVgAAk9Pd.jpg")
            interaction.user.createDM()
            .then((channel) => {
                channel.send({ embeds: [embed] })
                    .catch((error) => interaction.editReply("you have dms turned off idiot"))
                interaction.editReply("ok")
            })
        
    }
}