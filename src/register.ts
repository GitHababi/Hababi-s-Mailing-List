import { readdirSync } from "fs";
import {Collection, REST, Routes, ChatInputCommandInteraction, Client } from "discord.js";
import * as logger from './utils/console'

export const commandResponses = new Collection<string,(interaction: ChatInputCommandInteraction) => Promise<void>>()

export const registerCommands = async (rest: REST) => {
    logger.info("Registering (/) commands")
    const commandData = [];
    const commandFiles = readdirSync('./src/commands').filter((file)=>file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandData.push(command.data.toJSON())
        commandResponses.set(command.data.name, command.execute);
    }

    rest.put(Routes.applicationCommands(process.env.clientId ?? ''),{ body: commandData })
    logger.info("Done registering (/) commands")

}

export const registerEvents = async (client: Client) => {
    logger.info("Registering events")
    const eventFiles = readdirSync('./src/events').filter((file)=>file.endsWith(".js") || file.endsWith(".ts"));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        client.on(event.event, event.action);
    }
    logger.info("Done registering events")
}