import axios from "axios";
import { createPrivateKey } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { puertoWEB, puertoAPI, serverAPI, serverWEB, privateKey, secreto } from "../config/settings";

export const loginPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/sign-in', { datos: { url }, alerts: undefined })
}
export const forgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/forgot', { datos: { url } })
}
export const okForgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/okForgot', { datos: { url } })
}
export const registroPage = async (req, res) => {
  res.render('log/sign-up', { datos: {}, alerts: undefined })
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
          res.writeHead(302, {
            'Location': `http://${url}/admin/?valid=${token}`,
            'Content-Type': 'text/plain',
          })
          res.end()
        })
      } else {
        res.render('log/sign-in', {
          datos: req.body,
          alerts: [{ msg: 'La contraseña no es correcta' }]
        })
      }
    });

    return
  } catch (err) {
    res.render('log/sign-in', {
      datos: req.body,
      alerts: [{ msg: 'El usuario no existe' }]
    })
  }
}
export const olvido = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const seed = randomString
  const context = {
    emausu: req.body.emausu,
    pwdusu: passHash,
    seed,
  }
  const url = req.body.url

  console.log(context)
  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });

    res.render('log/okForgot', { datos: url })
  } catch (error) {
    console.log(error)
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    });
  }
};
