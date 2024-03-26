import express from "express";
import {
  usuario,
  crear,
  modificar,
  borrar,
  olvido,
  cambio,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios/insert", crear);
apiUsuarioRouter.post("/usuarios/update", modificar);
apiUsuarioRouter.post("/usuarios/delete", borrar);
apiUsuarioRouter.post("/usuarios/forgot", olvido);
apiUsuarioRouter.post("/usuarios/change", cambio);

export default apiUsuarioRouter;