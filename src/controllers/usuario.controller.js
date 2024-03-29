import * as DAL from '../models/usuario.model'

// proc
export const usuario = async (req, res) => {
  const context = req.body.context
  
  // proc
  try {
    const result = await DAL.find(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat: 0, data: err.message })
  }
}
export const crear = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
    PWDUSU: req.body.usuario.PWDUSU,
  }
  const context = usuario

  // proc
  try {
    const result = await DAL.insert(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat: 0, data: err.message })
  }
}
export const modificar = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
  }
  const context = usuario

  // proc
  try {
    const result = await DAL.update(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat: 0, data: err.message })
  }
}
export const borrar = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.usuario.USERID,
  }
  const context = usuario

  // proc
  try {
    const result = await DAL.remove(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat: 0, data: err.message })
  }
}
export const olvido = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.forgot(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat: 0, data: err.message })
  }
}
export const cambio = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.change(context)

    res.status(200).json({ stat: result.stat, data: result.data })
  } catch (err) {
    res.status(500).json({ stat:0, data: err.message })
  }
}
