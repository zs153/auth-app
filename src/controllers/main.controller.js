import axios from "axios";
import { createPrivateKey } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { puertoWEB, puertoAPI, serverAPI, serverWEB } from "../config/settings";

// pages
export const loginPage = async (req, res) => {
  res.render(`log/sign-in`)
};
export const forgotPage = async (req, res) => {
  res.render(`log/forgot`)
};
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

  res.redirect('/')
};

// proc
export const autorizar = async (req, res) => {
  const context = {
    userid: req.body.userid,
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    });

    if (usuario.length === 1) {
      // password
      const pwdusu = req.body.pwdusu

      // verifica contaseña
      bcrypt.compare(pwdusu, usuario.PWDUSU, async (err, ret) => {
        if (err) {
          res.render('sign-in', {
            datos: req.body,
            alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
          })
        }
        if (ret) {
          // payload
          const payload = {
            id: usuario.IDUSUA,
            userid: usuario.USERID,
            rol: usuario.ROLUSU,
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
            issuer: 'http://localhost:4600',
            expiresIn: '6 hours',
          }).then(token => {
            const options = {
              path: "/",
              sameSite: true,
              maxAge: 1000 * 60 * 60 * 6, // 6 horas
              httpOnly: true,
            }
            res.cookie('auth', token, options)
            res.cookie('noVer', '0')
            res.writeHead(302, {
              'Location': `http://${serverWEB}:${puertoWEB}/admin`,
              'Content-Type': 'text/plain',
            })
            res.end()
          })
        } else {
          res.render('sign-in', {
            datos: req.body,
            alerts: [{ msg: 'La contraseña no es correcta' }]
          })
        }
      });

      return
    } else {
      res.render('sign-in', {
        datos: req.body,
        alerts: [{ msg: 'El usuario no existe' }]
      })
    }
  } catch (err) {
    res.render('sign-in', {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido conectar con la base de datos' }]
    })
  }
}
export const olvido = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const seed = randomString
  let usuario = {
    EMAUSU: req.body.emausu,
  };
  
  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    });
        
    usuario = {
      IDUSUA: result.data.IDUSUA,
      PWDUSU: passHash,
    }
    const context = {
      emausu: result.data.EMAUSU,
      pwdusu: passHash,
      seed,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });

    res.redirect('/admin')
  } catch (error) {
    console.log(error)
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    });
  }
};
