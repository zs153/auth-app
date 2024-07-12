import express from 'express'
import { loginPage, forgotPage, logoutPage, registroPage, autorizar, olvido, okForgotPage, cambio, changePage, okChangePage, registro, okRegisterPage, actualizar, updatePage } from '../controllers/login.controller';

const loginRouter = express.Router()

// auth
loginRouter.get('/', loginPage)
loginRouter.get('/olvido', forgotPage)
loginRouter.get('/logout', logoutPage)
loginRouter.get('/change', changePage)
loginRouter.get('/update', updatePage)
loginRouter.get('/registro', registroPage)
loginRouter.get('/okforgot', okForgotPage)
loginRouter.get('/okchange', okChangePage)
loginRouter.get('/okregister', okRegisterPage)

// proc
loginRouter.post("/autorizar", autorizar)
loginRouter.post("/register", registro)
loginRouter.post("/change", cambio)
loginRouter.post("/update", actualizar)
loginRouter.post("/forgot", olvido)

export default loginRouter;
