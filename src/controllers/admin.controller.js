import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'
import { estadosUsuario } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })
    const datos = {
      usuarios: result.data,
      estadosUsuario: estadosUsuario,
    }

    res.render('admin', { user, datos })
  } catch (error) {
    console.log(error)
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}