export const attachmentIsVideo = (attachment:string) => {
    return (attachment.endsWith('.mp4') // Discord does not support video embeds for bots. (fuck you)
                        || attachment.endsWith('.mov') 
                        || attachment.endsWith('.webm') 
                        || attachment.endsWith('.mkv') 
                        || attachment.endsWith('.m4v'))
}