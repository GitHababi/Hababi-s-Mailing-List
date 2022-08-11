import { ErrorEvent } from "discord.js";

module.exports = {
    event: 'error',
    action: async (error:ErrorEvent) => {
        console.error(`[\x1b[31mHML\x1b[37m] Error: ${error.message}\n${error.error}`)
    }
}