import express from "express";
import { mainPage } from "../controllers/main.controller";
import authRoutes from "../middleware/auth";

const mainRouter = express.Router();

// pages
mainRouter.get('/', authRoutes, mainPage)

export default mainRouter;
