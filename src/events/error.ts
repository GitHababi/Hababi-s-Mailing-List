import { ErrorEvent } from "discord.js";
import * as logger from '../utils/console'
module.exports = {
    event: 'error',
    action: async (error:ErrorEvent) => {
        logger.error(`${error.message}\n${error.error}`)
    }
}