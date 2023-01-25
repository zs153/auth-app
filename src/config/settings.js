import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/./../../.env' })

export const dbPool = {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  poolMin: 1,
  poolMax: 4,
  poolIncrement: 1,
}
export const maxRows = 50000
export const batchSize = 1000
export const puerto = process.env.PORT;
export const secreto = process.env.SECRETO
export const publicKey = process.env.PUBLIC_KEY
export const privateKey = process.env.PRIVATE_KEY