import * as DAL from '../models/usuario.model'

const insertFromRec = (req) => {
  const usuario = {
    userid: req.body.usuario.USERID,
    emausu: req.body.usuario.EMAUSU,
    pwdusu: req.body.usuario.PWDUSU,
    stausu: req.body.usuario.STAUSU,
  }

  return usuario;
}
const updateFromRec = (req) => {
  const usuario = {
    userid: req.body.usuario.USERID,
    emausu: req.body.usuario.EMAUSU,
    rolusu: req.body.usuario.ROLUSU,
    stausu: req.body.usuario.STAUSU,
  }

  return usuario;
}
const deleteFromRec = (req) => {
  const usuario = {
    userid: req.body.usuario.USERID,
  }

  return usuario;
}
const forgotFromRec = (req) => {
  return req.body.context;
}
const changeFromRec = (req) => {
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
      res.status(404).end()
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
      res.status(200).end()
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
      res.status(200).end()
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
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const forgot = async (req, res) => {
  try {
    const result = await DAL.forgot(forgotFromRec(req))

    if (result !== null) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const change = async (req, res) => {
  try {
    const result = await DAL.change(changeFromRec(req))

    if (result !== null) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
