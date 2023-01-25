import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
} from '../controllers/admin.controller'

const adminRouter = express.Router()

// paginas
adminRouter.get('/', authRoutes, mainPage)

export default adminRouter
