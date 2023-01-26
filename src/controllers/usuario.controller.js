import axios from 'axios'
import bcrypt from 'bcrypt'
import { puertoAPI, serverAPI } from '../config/settings'
import { arrTiposRol, arrEstadosUsuario, estadosUsuario } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })
    const datos = {
      usuarios: result.data,
      estadosUsuario,
    }

    res.render('admin/usuarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const datos = {
    arrEstadosUsuario,
    arrTiposRol,
  }
  
  try {
    res.render('admin/usuarios/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.params.id,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    })
    const datos = {
      usuario: result.data,
      arrEstadosUsuario,
      arrTiposRol,
    }

    res.render('admin/usuarios/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insert = async (req, res) => {
  const user = req.user
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const usuario = {
    USERID: req.body.userid.toLowerCase(),
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    ROLUSU: req.body.rolusu,
    PWDUSU: passHash,
    STAUSU: req.body.stausu,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
      usuario,
    })

    res.redirect('/admin')
  } catch (error) {
    let msg = 'No se ha podido crear el nuevo usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    ROLUSU: req.body.rolusu,
    STAUSU: req.body.stausu
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/update`, {
      usuario,
    })

    res.redirect('/admin')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/delete`, {
      usuario,
    })

    res.redirect('/admin')
  } catch (error) {
    const msg = 'No se ha podido borrar el usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
