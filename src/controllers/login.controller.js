import axios from "axios";
import { createPrivateKey } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { puertoWEB, puertoAPI, serverAPI, serverWEB, privateKey, secreto } from "../config/settings";

export const loginPage = async (req, res) => {
	const url = req.query.valid

  res.render('log/sign-in', { datos: {url}, alerts: undefined })
}
export const forgotPage = async (req, res) => {
  const url = req.query.valid

  res.render('log/forgot', { datos: {url}, alerts: undefined })
}
export const okForgotPage = async (req, res) => {
  res.render('log/okForgot', { datos: {}, alerts: undefined })
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
  let usuario = {
    USERID: req.body.userid,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    });

    usuario = result.data
    const pwdusu = req.body.pwdusu
	  const url = req.body.url

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
          issuer: 'http://localhost:4000',
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

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/forgot`, {
      context,
    });

    res.redirect('/log/okForgot')
  } catch (error) {
    console.log(error)
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    });
  }
};
