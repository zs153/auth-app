import express from 'express'
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/usuario.controller'

const usuarioRouter = express.Router()

// pages
usuarioRouter.get('/usuarios', authRoutes, mainPage)
usuarioRouter.get('/usuarios/add', authRoutes, addPage)
usuarioRouter.get('/usuarios/edit/:id', authRoutes, editPage)

// procedures
usuarioRouter.post('/usuarios/insert', authRoutes, insert)
usuarioRouter.post('/usuarios/update', authRoutes, update)
usuarioRouter.post('/usuarios/delete', authRoutes, remove)

export default usuarioRouter