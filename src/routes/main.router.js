import express from "express";
import { logoutPage, loginPage, autorizar, olvido, forgotPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// acciones
mainRouter.get("/login", loginPage);
mainRouter.get("/logout", logoutPage)
mainRouter.get("/forgot", forgotPage)

// proc
mainRouter.post("/autorizar", autorizar)
mainRouter.post("/forgot", olvido)

export default mainRouter;
