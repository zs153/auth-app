import axios from 'axios'
import bcrypt from "bcrypt"
import { createPrivateKey } from 'crypto'
import { V4 } from 'paseto'
import { puertoAPI, serverAPI, privateKey, secreto } from '../config/settings'
import { estadosUsuario, arrEstadosUsuario } from '../public/js/enumeraciones'

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
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const newPage = async (req, res) => {
  const url = req.query.valid
  const datos = {
    url,
    arrEstadosUsario,
  }
  
  res.render('admin/new', { datos })
}
export const delPage = async (req, res) => {
  const url = req.query.valid

  res.render('admin/del', { datos: { url } })
}

// proc
export const autorizar = async (req, res) => {
  const pwdusu = req.body.pwdusu
  const url = req.body.url
  let usuario = {
    USERID: req.body.userid,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    });

    usuario = result.data

    // verifica contaseña
    bcrypt.compare(pwdusu, usuario.PWDUSU, async (err, ret) => {
      if (err) {
        res.render('sign-in', {
          datos: req.body,
          alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
        })
      }
      if (ret) {
        const payload = {
          userid: usuario.USERID,
        }
        const key = createPrivateKey({
          'key': privateKey,
          'format': 'pem',
          'type': 'pkcs8',
          'cipher': 'aes-256-cbc',
          'passphrase': secreto,
        })

        await V4.sign(payload, key, {
          audience: 'urn:client:claim',
          issuer: 'http://localhost:4000',
          expiresIn: '1 minute',
        }).then(token => {
          // res.writeHead(302, {
          //   'Location': `http://${url}/admin/clean/?valid=${token}`,
          //   'Content-Type': 'text/plain',
          // })
          // res.end()
          res.redirect('/')
        })
      } else {
        res.render('admin/sign-in', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        })
      }
    });

    return
  } catch (err) {
    res.render('admin/sign-in', {
      datos: req.body,
      alerts: [{ msg: 'El usuario no existe' }]
    })
  }
}
export const nuevo = async (req, res) => {
  const usuario = {
    USERID: req.body.userid,
    EMAUSU: req.body.emausu,
    STAUSU: req.body.stausu,
  }

  try {
    const datos = {
      url: req.body.url,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
      usuario,
    });

    res.render("log/okInsert", {
      datos
    });
  } catch (error) {
    res.render("error400", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido crear el recurso' }]
    });
  }
}
export const borrar = async (req, res) => {
  const usuario = {
    USERID: req.body.userid,
  }

  try {
    const datos = {
      url: req.body.url,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/delete`, {
      usuario,
    });

    res.render("log/okDelete", {
      datos
    });
  } catch (error) {
    res.render("error400", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido crear el recurso' }]
    });
  }
}
