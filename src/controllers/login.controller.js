import axios from "axios";
import { createPrivateKey, scrypt, scryptSync } from 'crypto'
import { V4 } from 'paseto'
import { serverAPI, privateKey, secretoKey} from "../config/settings";

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

  res.render('logout')
};

// proc
export const autorizar = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  
  // version DFB (sin modulo cryptografico)
  // try {
  //   await axios.post(`http://${serverAPI}/api/usuario`, {
  //     context,
  //   }).then(async usuario => {
  //     if (usuario.data.stat) {
  //       const pwdusu = req.body.pwdusu

  //       const result = scryptSync(password, secretoKey, 64)
  //       if (result) {
  //         if (pwdusu === result.toString('base64')) {
  //           const token = usuario.data.data.USERID
  //           res.writeHead(302, {
  //             'Location': `http://${url}/dispat?valid=${token}`,
  //             'Content-Type': 'text/plain',
  //           })
  //           res.end()
  //         } else {
  //           throw new Error("La contraseña no es correcta")  
  //         }
  //       } else {
  //         throw new Error("La contraseña no es correcta")
  //       }
  //     };
  //   })
  // } catch (error) {
  //   res.render("sign-in", {
  //     datos: req.body,
  //     alerts: [{ msg: error }]
  //   });
  // }

  // version produccion
  try {
    const context = {
      USERID: req.body.userid.toLowerCase(),
    }

    await axios.post(`http://${serverAPI}/api/usuario`, {
      context,
    }).then(async usuario => {
      if (usuario.data.stat) {
        const pwdusu = req.body.pwdusu
        const payload = {
          userid: usuario.data.data.USERID,
        }
    
        // sincrono
        const result = scryptSync(pwdusu, secretoKey, 64)
        if (result) {
          if (usuario.data.data.PWDUSU === result.toString('base64')) {
            const key = createPrivateKey({
              key: privateKey,
              format: 'pem',
              passphrase: secretoKey
            })
            
            await V4.sign(payload, key, {
              expiresIn: '1 minute',
            }).then(token => {
              const url = req.body.url
              res.writeHead(302, {
                'Location': `http://${url}/dispat/?valid=${token}`,
                'Content-Type': 'text/plain',
              })
              res.end()
            }).catch(() => {
              throw new Error("No se ha podido firmar el token")
            })
          } else {
            throw new Error("La contraseña no es correcta")
          }
        } else {
          throw new Error("No se ha podido verificar la contraseña")
        }
      } else {
        throw new Error("Usuario no encontrado")
      }
    })
  } catch (error) {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: error }]
    });
  }
}
export const registro = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  await axios.post(`http://${serverAPI}/api/usuario`, {
    context,
  }).then(async usuario => {
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
  
      const result = await axios.post(`http://${serverAPI}/api/usuarios/insert`, {
        context,
      })
      
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
  })
}
export const olvido = async (req, res) => {
  const context = {
    EMAUSU: req.body.emausu.toLowerCase(),
  }

  await axios.post(`http://${serverAPI}/api/usuario`, {
    context,
  }).then(async usuario => {
    if (usuario.data.stat) {
      const randomString = Math.random().toString(36).substring(2, 10);
      const passHash = await hash(randomString)
      const context = {
        EMAUSU: req.body.emausu.toLowerCase(),
        PWDUSU: passHash,
        SEED: randomString,
      }
  
      await axios.post(`http://${serverAPI}/api/usuarios/forgot`, {
        context,
      }).then(result => {
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
      })
    } else {
      res.render("forgot", {
        datos: req.body,
        alerts: [{ msg: "No se ha podido identificar el email" }]
      });
    }
  })
}
export const cambio = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  await axios.post(`http://${serverAPI}/api/usuario`, {
    context,
  }).then(async usuario => {
    if (usuario.data.stat) {
      const pwdact = req.body.pwdact
      await verify(pwdact, usuario.data.data.PWDUSU).then(async ret => {
        if (ret) {
          const passHash = await hash(req.body.pwdusu);
          const context = {
            USERID: req.body.userid.toLowerCase(),
            PWDUSU: passHash,
          }
          const result = await axios.post(`http://${serverAPI}/api/usuarios/change`, {
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
  })
  
}
export const actualizar = async (req, res) => {
  const context = {
    USERID: req.body.userid.toLowerCase(),
  }
  await axios.post(`http://${serverAPI}/api/usuario`, {
    context,
  }).then(async usuario => {
    if (usuario.data.stat) {
      const pwdusu = req.body.pwdusu
      await verify(pwdusu, usuario.data.data.PWDUSU).then(async ret => {
        if (ret) {
          const context = {
            USERID: req.body.userid.toLowerCase(),
            EMAUSU: req.body.emausu,
          }
          const result = await axios.post(`http://${serverAPI}/api/usuarios/update`, {
            context,
          })
  
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
  })
}

// helpers
async function hash(password) {
  return new Promise((resolve, reject) => {
    scrypt(password, secretoKey, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    scrypt(password, secretoKey, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(hash === derivedKey.toString('base64'))
    });
  })
}

