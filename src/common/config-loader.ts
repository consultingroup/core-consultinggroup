export const configLoader = () => {
    return {
        sendgrid: process.env.SENGRIDE_API_KEY,
        port: process.env.PORT
    }
}