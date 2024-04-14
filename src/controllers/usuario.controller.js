import * as DAL from '../models/usuario.model'

// proc
export const usuario = async (req, res) => {
  const context = req.body.context
  
  // proc
  try {
    const result = await DAL.find(context)

    res.send({ stat: result.stat, data: result.data })
  } catch (err) {
    res.send({ stat: 0, data: err.message })
  }
}
export const crear = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.context.USERID,
    EMAUSU: req.body.context.EMAUSU,
    PWDUSU: req.body.context.PWDUSU,
  }

  // proc
  try {
    const result = await DAL.insert(usuario)
    
    res.send({ stat: result.stat, data: result.data })
  } catch (err) {
    res.send({ stat: 0, data: err.message })
  }
}
export const modificar = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.context.USERID,
    EMAUSU: req.body.context.EMAUSU,
  }

  // proc
  try {
    const result = await DAL.update(usuario)

    res.send({ stat: result.stat, data: result.data })
  } catch (err) {
    res.send({ stat: 0, data: err.message })
  }
}
export const borrar = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.context.USERID,
  }

  // proc
  try {
    const result = await DAL.remove(usuario)

    res.send({ stat: result.stat, data: result.data })
  } catch (err) {
    res.send({ stat: 0, data: err.message })
  }
}
export const olvido = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.forgot(context)
    
    res.send({ stat: result.stat, data: result.data })
  } catch (err) {    
    res.send({ stat: 0, data: err.message })
  }
}
export const cambio = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.change(context)

    res.send({ stat: result.stat, data: result.data })
  } catch (err) {
    res.send({ stat:0, data: err.message })
  }
}
