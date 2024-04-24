import { simpleExecute } from "../services/database.js";

const baseQuery = "SELECT uu.* FROM usuarios uu";
const insertSql = "BEGIN RECURSOS_PKG.INSERTUSUARIO(:userid,:emausu,:pwdusu); END;";
const updateSql = "BEGIN RECURSOS_PKG.UPDATEUSUARIO(:userid,:emausu); END;";
const removeSql = "BEGIN RECURSOS_PKG.DELETEUSUARIO(:userid); END;";
const olvidoSql = "BEGIN RECURSOS_PKG.FORGOTPASSWORD(:emausu,:pwdusu,:seed); END;";
const cambioSql = "BEGIN RECURSOS_PKG.CHANGEPASSWORD(:userid,:pwdusu); END;";

export const find = async (context) => {
  // bind
  let query = baseQuery;
  let bind = context;

  if (context.USERID) {
    bind.userid = context.USERID;
    query += " WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    bind.emausu = context.EMAUSU;
    query += " WHERE uu.emausu = :emausu";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret.rows.length) {
    return ({ stat: 1, data: ret.rows[0] })
  } else {
    return ({ stat: 0, data: ret })
  }
};
export const insert = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: ret })
  }
};
export const update = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: ret })
  }
};
export const remove = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: ret })
  }
};
export const forgot = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(olvidoSql, bind)
  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: ret })
  }
};
export const change = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: ret })
  }
};
