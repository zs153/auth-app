import express from 'express'
import { loginPage, forgotPage, logoutPage, registroPage, autorizar, olvido, okForgotPage } from '../controllers/login.controller';

const loginRouter = express.Router()

// auth
loginRouter.get('/login', loginPage)
loginRouter.get('/forgot', forgotPage)
loginRouter.get('/logout', logoutPage)
loginRouter.get('/registro', registroPage)
loginRouter.get('/okforgot', okForgotPage)

// proc
loginRouter.post("/autorizar", autorizar)
loginRouter.post("/forgot", olvido)

export default loginRouter;