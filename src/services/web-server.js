import http from 'http'
import path from "path";
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { puerto } from '../config/settings'
// rutas
import apiUsuarioRouter from "../routes/usuario.router";

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // view engine setup
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "ejs");

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(cors())

    // routes
    app.use("/api", apiUsuarioRouter)

    // server
    httpServer
      .listen(puerto)
      .on('listening', () => {
        console.log(`Web server listening on port: ${puerto} `)

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
