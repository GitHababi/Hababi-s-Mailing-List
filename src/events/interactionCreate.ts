import { Interaction } from "discord.js"
import { commandResponses } from "../register"

module.exports = {
    event: "interactionCreate",
    action: async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let response = commandResponses?.get(interaction.commandName);
            if (response !== undefined)
                response(interaction)
        }
    }
}