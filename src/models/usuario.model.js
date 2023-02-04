import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  uu.*
FROM usuarios uu
`;
const insertSql = `BEGIN RECURSOS_PKG.INSERTUSUARIO(
  :userid,
  :emausu,
  :pwdusu,
  :stausu
); END;
`;
const updateSql = `BEGIN RECURSOS_PKG.UPDATEUSUARIO(
  :userid,
  :nomusu,
  :emausu, 
  :stausu
); END;
`;
const removeSql = `BEGIN RECURSOS_PKG.DELETEUSUARIO(
  :userid 
); END;
`;
const olvidoSql = `BEGIN RECURSOS_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu,
  :seed
); END;
`;
const cambioSql = `BEGIN RECURSOS_PKG.CHANGEPASSWORD(
  :userid,
  :pwdusu
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.USERID) {
    binds.userid = context.USERID;
    query += "WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    binds.emausu = context.EMAUSU;
    query += "WHERE uu.emausu = :emausu";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const insert = async (bind) => {
  try {
    await simpleExecute(insertSql, bind);
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const update = async (bind) => {
  try {
    await simpleExecute(updateSql, bind);
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const remove = async (bind) => {
  try {
    await simpleExecute(removeSql, bind);
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const forgot = async (bind) => {
  try {
    await simpleExecute(olvidoSql, bind);
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const change = async (bind) => {i
  try {
    await simpleExecute(cambioSql, bind);
  } catch (error) {
    bind = null;
  }

  return bind;
};
