import axios from "axios";
import { createPrivateKey, scrypt } from 'crypto'
import { V4 } from 'paseto'
import { puertoAPI, serverAPI, privateKey, secreto } from "../config/settings";

export const loginPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/sign-in', { datos: { url }, alerts: undefined })
}
export const forgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/forgot', { datos: { url } })
}
export const changePage = async (req, res) => {
  const url = req.query.valid

  res.render('log/change', { datos: { url } })
}
export const registroPage = async (req, res) => {
  //TODO
  res.render('log/sign-up', { datos: {}, alerts: undefined })
}
export const okForgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/okForgot', { datos: { url } })
}
export const okChangePage = async (req, res) => {
  const url = req.query.valid

  res.render('log/okChange', { datos: { url } })
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

  res.render('log/logout')
};

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
    await verify(pwdusu, usuario.PWDUSU, async (err, ret) => {
      if (err) {
        throw new Error('No se ha podido verificar la identidad del usuario')
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
          res.writeHead(302, {
            'Location': `http://${url}/admin/clean/?valid=${token}`,
            'Content-Type': 'text/plain',
          })
          res.end()
        })
      } else {
        throw new Error('La contraseña no es correcta')        
      }
    })

    // bcrypt.compare(pwdusu, usuario.PWDUSU, async (err, ret) => {
    //   if (err) {
    //     res.render('sign-in', {
    //       datos: req.body,
    //       alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    //     })
    //   }
    //   if (ret) {
    //     const payload = {
    //       userid: usuario.USERID,
    //     }
    //     const key = createPrivateKey({
    //       'key': privateKey,
    //       'format': 'pem',
    //       'type': 'pkcs8',
    //       'cipher': 'aes-256-cbc',
    //       'passphrase': secreto,
    //     })

    //     await V4.sign(payload, key, {
    //       audience: 'urn:client:claim',
    //       issuer: 'http://localhost:4000',
    //       expiresIn: '1 minute',
    //     }).then(token => {
    //       res.writeHead(302, {
    //         'Location': `http://${url}/admin/clean/?valid=${token}`,
    //         'Content-Type': 'text/plain',
    //       })
    //       res.end()
    //     })
    //   } else {
    //     res.render('log/sign-in', {
    //       datos: req.body,
    //       alerts: [{ msg: 'La contraseña no es correcta' }]
    //     })
    //   }
    // });

    return
  } catch (err) {
    res.render('log/sign-in', {
      datos: req.body,
      alerts: [{ msg: err }]
    })
  }
}
export const olvido = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  // const salt = await bcrypt.genSalt(10);
  //const passHash = await bcrypt.hash(randomString, salt);
  const passHash = await hash(randomString)
  const context = {
    emausu: req.body.emausu,
    pwdusu: passHash,
    seed: randomString,
  }
  const datos = {
    url: req.body.url,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });

    res.render('log/okForgot', { datos })
  } catch (error) {
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    });
  }
}
export const change = async (req, res) => {
  const pwdact = req.body.pwdact
  let usuario = {
    USERID: req.body.userid,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    });
    usuario = result.data

    // verifica contaseña
    await verify(pwdact, usuario.PWDUSU, async (err,ret) => {
      if (err) {
        throw new Error('No se ha podido verificar la identidad del usuario')
      }

      if (ret) {
        const passHash = await hash(req.body.pwdusu);
        const context = {
          userid: req.body.userid,
          pwdusu: passHash,
        }
        const datos = {
          url: req.body.url,
        }

        await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/change`, {
          context,
        });

        res.render("log/okChange", {
          datos
        });
      } else {
        res.render('log/sign-in', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        });
      }
    })

    // bcrypt.compare(pwdact, usuario.PWDUSU, async (err, ret) => {
    //   if (err) {
    //     throw new Error('No se ha podido verificar la identidad del usuario')
    //   }
    //   if (ret) {
    //     const salt = await bcrypt.genSalt(10);
    //     const passHash = await bcrypt.hash(req.body.pwdusu, salt);
    //     const context = {
    //       userid: req.body.userid,
    //       pwdusu: passHash,
    //     }
    //     const datos = {
    //       url: req.body.url,
    //     }

    //     await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/change`, {
    //       context,
    //     });

    //     res.render("log/okChange", {
    //       datos
    //     });
    //   } else {
    //     res.render('log/sign-in', {
    //       datos: req.body,
    //       alerts: [{ msg: 'La contraseña no es correcta' }]
    //     });
    //   }
    // });
  } catch (error) {
    res.render("log/sign-in", {
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
      resolve(derivedKey.toString('hex'))
    });
  })
}
async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(hash === derivedKey.toString('hex'))
    });
  })
}
