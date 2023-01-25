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
        issuer: 'http://localhost:4600',
        clockTolerance: '1 min',
      }).then(r => {
        req.user = {
          id: r.id,
          userID: r.userid,
          rol: r.rol,
          oficina: r.oficina,
        }

        next()
      }).catch(err => {
        res.render('log/sign-in', { datos: req.body, alerts: [{ msg: 'Error de clave pública. No se puede verificar la clave pública' }] })
      })
    } catch {
      res.render('log/sign-in', { datos: req.body, alerts: [{ msg: 'Error de clave pública. No se puede crear la clave pública' }] })
    }
  } else {
    res.render('log/sign-in', { datos: req.body, alerts: [{ msg: 'Error de clave pública: No se ha generado el token de clave pública' }] })
  }
}
export default authRoutes