import express from 'express'
import authRoutes from '../middleware/auth'
import {
  autorizar,
  mainPage,
} from '../controllers/admin.controller'

const adminRouter = express.Router()

// paginas
adminRouter.get('/new', newPage)
adminRouter.get('/del', delPage)

// proc
adminRouter.post("/new", nuevo)
adminRouter.post("/del", borrar)
export default adminRouter
