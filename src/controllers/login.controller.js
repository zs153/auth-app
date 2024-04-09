import axios from "axios";
import { createPrivateKey, scrypt } from 'crypto'
import { V4 } from 'paseto'
import { puertoAPI, serverAPI, privateKey, secreto } from "../config/settings";

export const loginPage = async (req, res) => {
  const url = req.query.valid

  res.render('sign-in', { datos: { url }, alerts: undefined })
}
export const forgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('forgot', { datos: { url } })
}
export const changePage = async (req, res) => {
  const url = req.query.valid

  res.render('change', { datos: { url } })
}
export const updatePage = async (req, res) => {
  const url = req.query.valid

  res.render('update', { datos: { url } })
}
export const registroPage = async (req, res) => {
  const url = req.query.valid
  
  res.render('sign-up', { datos: {url} })
}
export const okForgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('okForgot', { datos: { url } })
}
export const okChangePage = async (req, res) => {
  const url = req.query.valid

  res.render('okChange', { datos: { url } })
}
export const okRegisterPage = async (req, res) => {
  const url = req.query.valid

  res.render('okRegister', { datos: { url } })
}
export const logoutPage = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);
  res.cookie("noVer", undefined, options);

  res.render('logout')
};

// proc
export const autorizar = async (req, res) => {
  const pwdusu = req.body.pwdusu
  const url = req.body.url
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    });

    if (usuario.data.stat === 0) {
      throw ('Usuario no registrado')
    }
    
    // verifica contaseña
    await verify(pwdusu, usuario.data.data.PWDUSU).then(async ret => {
      if (ret) {
        const payload = {
          userid: usuario.data.data.USERID,
        }
        const key = createPrivateKey({
          key: privateKey,
          format: 'pem',
          passphrase: secreto
        })
        
        await V4.sign(payload, key, {
          audience: 'urn:client:claim',
          issuer: 'http://localhost:4000',
          expiresIn: '1 minute',
        }).then(token => {
          res.writeHead(302, {
            'Location': `http://${url}/admin/?valid=${token}`,
            'Content-Type': 'text/plain',
          })
          res.end()
        })
      } else {
        throw ('La contraseña no es correcta')
      }
    }).catch(err => {
	    throw (err)
    })

    return
  } catch (err) {
    res.render('log/sign-in', {
      datos: req.body,
      alerts: [{ msg: err }]
    })
  }
}
export const registro = async (req, res) => {
  const passHash = await hash(req.body.pwdusu);
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  const usuario = {
    USERID: req.body.userid.toLowerCase(),
    EMAUSU: req.body.emausu.toLowerCase(),
    PWDUSU: passHash,
  }
  const datos = {
    url: req.body.url,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    });

    if (result.data.stat) {
      return res.render("sign-in", {
        datos,
        alerts: [{ msg: 'Usuario ya registrado' }]
      });
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
      usuario,
    });

    res.render('okRegister', { datos })
  } catch (error) {
    res.render("sign-up", {
      datos,
      alerts: [{ msg: 'El usuario no ha podido ser registrado' }]
    });
  }
}
export const olvido = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const passHash = await hash(randomString)
  const context = {
    EMAUSU: req.body.emausu.toLowerCase(),
    PWDUSU: passHash,
    SEED: randomString,
  }
  const datos = {
    url: req.body.url,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });

    res.render('okForgot', { datos })
  } catch (error) {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No podido ser verificada la identidad del usuario' }]
    });
  }
}
export const cambio = async (req, res) => {
  const pwdact = req.body.pwdact
  let context = {
    USERID: req.body.userid.toLowerCase(),
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    });

    // verifica contaseña
    await verify(pwdact, usuario.data.data.PWDUSU).then(async ret => {
      if (ret) {
        const passHash = await hash(req.body.pwdusu);
        const context = {
          USERID: req.body.userid.toLowerCase(),
          PWDUSU: passHash,
        }
        const datos = {
          url: req.body.url,
        }

        await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/change`, {
          context,
        });

        res.render("okChange", {
          datos
        });
      } else {
        res.render('sign-in', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        });
      }
    }).catch(err => {
			throw new Error('No ha podido ser verificada la identidad del usuario')
		})
  } catch (error) {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: error }]
    });
  }
}
export const actualizar = async (req, res) => {
  const pwdusu = req.body.pwdusu

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        USERID: req.body.userid.toLowerCase(),
      }
    });

    // verifica contaseña
    await verify(pwdusu, usuario.data.data.PWDUSU).then(async ret => {
      if (ret) {
        const usuario = {
          USERID: req.body.userid.toLowerCase(),
          EMAUSU: req.body.emausu,
        }
        const datos = {
          url: req.body.url,
        }

        await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/update`, {
          usuario,
        });

        res.render("okUpdate", {
          datos
        });
      } else {
        res.render('update', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        });
      }
    }).catch(err => {
			throw new Error('No ha podido ser verificada la identidad del usuario')
		})
  } catch (error) {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: error }]
    });
  }
}

// helpers
async function hash(password) {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(hash === derivedKey.toString('base64'))
    });
  })
}
