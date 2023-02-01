import { createPublicKey } from 'crypto'
import { V4 } from 'paseto'
import { publicKey } from '../config/settings'

const authRoutes = async (req, res, next) => {
  const tokenHeader = req.cookies.auth

  if (typeof tokenHeader !== 'undefined') {
    try {
      // paseto public
      const key = createPublicKey({
        'key': publicKey,
        'format': 'pem',
        'type': 'spki',
      })
      await V4.verify(tokenHeader, key, {
        audience: 'urn:client:claim',
        issuer: 'http://localhost:4000',
        clockTolerance: '1 min',
      }).then(r => {
        req.user = {
          userid: r.userid,
        }

        next()
      }).catch(err => {
        //const msg = "Error de clave pública. No se puede verificar la clave pública"
        res.render('log/sign-in', { datos: req.body, alerts: [] })
      })
    } catch {
      //const msg = "Error de clave pública. No se puede crear la clave pública"
      res.render('log/sign-in', { datos: req.body, alerts: [] })
    }
  } else {
    //const msg = "Error de clave pública: No se ha generado el token de clave pública"
    res.render('log/sign-in', { datos: req.body, alerts: [] })
  }
}
export default authRoutes