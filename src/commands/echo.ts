import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import * as logger from '../utils/console'
module.exports = { 
    data: new SlashCommandBuilder()
            .setName("echo")
            .setDescription("echos back user input")
            .addStringOption(option => 
                option.setName('input')
                      .setDescription('What will be echoed back')
                      .setRequired(true)),

    execute: async (interaction: ChatInputCommandInteraction) => {
        logger.info(`Echoing: ${interaction.options.getString('input') ?? ""}`)
        interaction.reply(interaction.options.getString('input') ?? "")
    }
}