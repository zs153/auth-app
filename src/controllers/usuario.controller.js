import * as DAL from '../models/usuario.model'

const insertFromRec = (req) => {
  const usuario = {
    userid: req.body.usuario.USERID,
    nomusu: req.body.usuario.NOMUSU,
    emausu: req.body.usuario.EMAUSU,
    rolusu: req.body.usuario.ROLUSU,
    pwdusu: req.body.usuario.PWDUSU,
    stausu: req.body.usuario.STAUSU,
  }

  return usuario;
}
const updateFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
    nomusu: req.body.usuario.NOMUSU,
    emausu: req.body.usuario.EMAUSU,
    rolusu: req.body.usuario.ROLUSU,
    stausu: req.body.usuario.STAUSU,
  }

  return usuario;
}
const deleteFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.IDUSUA,
  }

  return usuario;
}
const forgotFromRec = (req) => {
  return req.body.context;
}

// proc
export const usuario = async (req, res) => {
  const context = req.body.usuario

  try {
    const result = await DAL.find(context)

    if (result.length === 1) {
      return res.status(200).json(result[0])
    } else {
      res.status(200).json(null)
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const usuarios = async (req, res) => {
  const context = req.body.usuario

  try {
    const result = await DAL.find(context)

    return res.status(200).json(result)
  } catch (err) {
    res.status(500).end()
  }
}
export const insert = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const update = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const remove = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const forgot = async (req, res) => {
  try {
    await DAL.forgot(forgotFromRec(req))

    res.status(200).end()
  } catch (err) {
    res.status(500).end()
  }
}
