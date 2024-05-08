import http from 'http'
// import path from "path";
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { puertoAPI } from '../config/settings'
// rutas
import apiUsuarioRouter from "../routes/usuario.router";

let httpServer

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // view engine setup
    // app.set("views", path.join(__dirname, "../views"));
    // app.set("view engine", "ejs");

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())
    // app.use(express.static(path.join(__dirname, "../public")));

    // routes
    app.use("/api", apiUsuarioRouter)

    const port = normalizePort(puertoAPI || "4601");

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on port: ${port} `)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}
module.exports.close = close
