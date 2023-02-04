import express from 'express'
import { loginPage, forgotPage, logoutPage, registroPage, autorizar, olvido, okForgotPage, change, changePage, okChangePage } from '../controllers/login.controller';

const loginRouter = express.Router()

// auth
loginRouter.get('/login', loginPage)
loginRouter.get('/forgot', forgotPage)
loginRouter.get('/logout', logoutPage)
loginRouter.get('/change', changePage)
loginRouter.get('/registro', registroPage)
loginRouter.get('/okforgot', okForgotPage)
loginRouter.get('/okchange', okChangePage)

// proc
loginRouter.post("/autorizar", autorizar)
loginRouter.post("/forgot", olvido)
loginRouter.post("/change", change)

export default loginRouter;
