import express from "express";
import {
  usuario,
  usuarios,
  insert,
  update,
  remove,
  forgot,
  change,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", insert);
apiUsuarioRouter.post("/usuarios/update", update);
apiUsuarioRouter.post("/usuarios/delete", remove);
apiUsuarioRouter.post("/usuarios/forgot", forgot);
apiUsuarioRouter.post("/usuarios/change", change);

export default apiUsuarioRouter;