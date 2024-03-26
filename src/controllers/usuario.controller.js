import * as DAL from '../models/usuario.model'

// proc
export const usuario = async (req, res) => {
  const context = req.body.context
  
  try {
    const result = await DAL.find(context)
    
    if (result.stat) {
      if (result.data.length === 1) {
        res.status(200).json({ stat: 1, data: result.data[0] })
      } else {
        res.status(200).json({ stat: null, data: 'Usuario no encontrado' })
      }
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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

  try {
    const result = await DAL.insert(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no creado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const usuario = {
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
  }
  const context = usuario

  try {
    const result = await DAL.update(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
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

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const olvido = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.forgot(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: 'Ok' })
    } else {
      res.status(400).json({ stat: null, data: 'Contraseña no generada' })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const cambio = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.change(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: 'Ok' })
    } else {
      res.status(400).json({ stat: null, data: 'Contraseña no generada' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
