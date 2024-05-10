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
  const user = req.query.user
  const url = req.query.valid

  res.render('change', { datos: { user, url } })
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
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
    context,
  });

  if (usuario.data.stat) {
    const pwdusu = req.body.pwdusu

    // sincrono
    scrypt(pwdusu, secreto, 64, (err, derivedKey) => {
      if (err) {
        res.render("sign-in", {
          datos: req.body,
          alerts: [{ msg: "No se ha podido verificar la contraseña\n" + err }]
        });
      }
      
      if (usuario.data.data.PWDUSU === derivedKey.toString('base64')) {
        const payload = {
          userid: usuario.data.data.USERID,
        }
        const key = createPrivateKey({
          key: privateKey,
          format: 'pem',
          passphrase: secreto
        })
        
        V4.sign(payload, key, {
          expiresIn: '1 minute',
        }).then(token => {
          const url = req.body.url
          res.writeHead(302, {
            'Location': `http://${url}/dispat/?valid=${token}`,
            'Content-Type': 'text/plain',
          })
          res.end()
        })  
      } else {
        res.render("sign-in", {
          datos: req.body,
          alerts: [{ msg: "La contraseña no es correcta" }]
        });
      }
    });

    /*
    // asincrono
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
          const url = req.body.url
          res.writeHead(302, {
            'Location': `http://${url}/admin/?valid=${token}`,
            'Content-Type': 'text/plain',
          })
          res.end()
        })
      } else {
        res.render("sign-in", {
          datos: req.body,
          alerts: [{ msg: "La contraseña no es correcta" }]
        });
      }
    }).catch(err => {
      res.render("sign-in", {
        datos: req.body,
        alerts: [{ msg: "No se ha podido verificar la contraseña\n" + err }]
      });
    })
    */
    return
  } else {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido identificar al usuario" }]
    });
  }
}
export const registro = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
    context,
  });
  
  if (usuario.data.stat) {
    return res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: 'El Usuario ya esta registrado' }]
    });
  } else {
    const passHash = await hash(req.body.pwdusu);
    const context = {
      USERID: req.body.userid.toLowerCase(),
      EMAUSU: req.body.emausu.toLowerCase(),
      PWDUSU: passHash,
    }

    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
      context,
    });

    if (result.data.stat) {
      const datos = {
        url: req.body.url,
      }

      res.render('okRegister', { datos })
    } else {
      res.render("sign-up", {
        datos: req.body,
        alerts: [{ msg: 'El usuario no ha podido se registrado\n' + result.data.data }]
      });
    }
  }
}
export const olvido = async (req, res) => {
  const context = {
    EMAUSU: req.body.emausu.toLowerCase(),
  }
  const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
    context,
  });

  if (usuario.data.stat) {
    const randomString = Math.random().toString(36).substring(2, 10);
    const passHash = await hash(randomString)
    const context = {
      EMAUSU: req.body.emausu.toLowerCase(),
      PWDUSU: passHash,
      SEED: randomString,
    }

    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });
  
    if (result.data.stat) {
      const datos = {
        url: req.body.url,
      }
    
      res.render('okForgot', { datos })
    } else {
      res.render("sign-in", {
        datos: req.body,
        alerts: [{ msg: 'No se ha podido generar una nueva contraseña\n' + result.data.data }]
      });
    }
  } else {
    res.render("forgot", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido identificar el email" }]
    });
  }
}
export const cambio = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
    context,
  });
  
  if (usuario.data.stat) {
    const pwdact = req.body.pwdact
    await verify(pwdact, usuario.data.data.PWDUSU).then(async ret => {
      if (ret) {
        const passHash = await hash(req.body.pwdusu);
        const context = {
          USERID: req.body.userid.toLowerCase(),
          PWDUSU: passHash,
        }
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/change`, {
          context,
        });
        
        if (result.data.stat) {
          const datos = {
            url: req.body.url,
          }

          res.render("okChange", { datos });
        } else {
          res.render("sign-in", {
            datos: req.body,
            alerts: [{ msg: 'No se ha podido identificar al usuario\n' + result.data.data }]
          });
        }
      } else {
        res.render('sign-in', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        });
      }
    }).catch(err => {
      res.render("sign-in", {
        datos: req.body,
        alerts: [{ msg: "No se ha podido verificar la contraseña\n" + err }]
      });
    })
  } else {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido identificar al usuario\n" + usuario.data.data }]
    });
  }
}
export const actualizar = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
    context,
  });
  
  if (usuario.data.stat) {
    const pwdusu = req.body.pwdusu
    await verify(pwdusu, usuario.data.data.PWDUSU).then(async ret => {
      if (ret) {
        const context = {
          USERID: req.body.userid.toLowerCase(),
          EMAUSU: req.body.emausu,
        }
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/update`, {
          context,
        });
        
        if (result.data.stat) {
          const datos = {
            url: req.body.url,
          }

          res.render("okUpdate", { datos });
        } else {
          res.render("sign-in", {
            datos: req.body,
            alerts: [{ msg: 'No se ha podido identificar al usuario\n' + result.data.data }]
          });
        }
      } else {
        res.render('update', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        });
      }
    }).catch(err => {
      res.render("sign-in", {
        datos: req.body,
        alerts: [{ msg: "No se ha podido verificar la contraseña\n" + err }]
      });
    })
  } else {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido identificar al usuario\n" + usuario.data.data }]
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

