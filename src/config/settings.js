import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/./../../.env' })

export const puerto = process.env.PORT;
export const serverWEB = process.env.SERVER_WEB;
export const serverAPI = process.env.SERVER_API;
export const secretoKey = process.env.SECRETO_KEY
export const publicKey = process.env.PUBLIC_KEY
export const privateKey = process.env.PRIVATE_KEY