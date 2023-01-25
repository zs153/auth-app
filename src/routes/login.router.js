import express from 'express'
import { loginPage, forgotPage, logoutPage, registroPage, autorizar, olvido } from '../controllers/login.controller';

const loginRouter = express.Router()

// auth
loginRouter.get('/login', loginPage)
loginRouter.get('/forgot', forgotPage)
loginRouter.get('/logout', logoutPage)
loginRouter.get('/registro', registroPage)

// proc
loginRouter.post("/autorizar", autorizar)
loginRouter.post("/forgot", olvido)

export default loginRouter;