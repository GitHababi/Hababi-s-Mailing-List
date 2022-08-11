export const info = (...data: any[]) => {
    data.map((val) => `${val}`);
    console.log(`[\x1b[36mHML\x1b[37m] \x1b[90m${new Date().toTimeString().substring(0,8)}\x1b[0m ${data}`)
}
export const error = (...data: any[]) => {
    data.map((val) => `${val}`);
    console.error(`[\x1b[31mERROR\x1b[37m] \x1b[90m${new Date().toTimeString().substring(0,8)} \x1b[31mError\x1b[37m: ${data}`)
}
