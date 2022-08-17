export const info = (...data: any[]) => {
    data.map((val) => `${val}`);
    console.log(`[HML] ${new Date().toTimeString().substring(0,8)} ${data}`)
}
export const error = (...data: any[]) => {
    data.map((val) => `${val}`);
    console.error(`[ERROR] ${new Date().toTimeString().substring(0,8)} Error: ${data}`)
}
