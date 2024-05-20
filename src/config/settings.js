import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/./../../.env' })

export const publicKey = process.env.PUBLIC_KEY
export const privateKey = process.env.PRIVATE_KEY
export const secretoKey = process.env.SECRETO_KEY
export const puertoAPI = process.env.PORT_API;
export const serverAPI = process.env.SERVER_API;
export const puertoWEB = process.env.PORT_WEB;
export const serverWEB = process.env.SERVER_WEB;