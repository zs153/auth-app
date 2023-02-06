import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'

// import rutas
import loginRouter from "./routes/login.router";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use('/log', loginRouter)

export default app;
