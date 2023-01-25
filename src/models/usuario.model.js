import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  uu.*
FROM usuarios uu
`;
const insertSql = `BEGIN RESOURCES_PKG.INSERTUSUARIO(
  :userid,
  :emausu,
  :rolusu,
  :pwdusu,
  :idusua
); END;
`;
const updateSql = `BEGIN OPORRAK_PKG.UPDATEUSUARIO(
  :idusua,
  :emausu, 
  :rolusu
); END;
`;
const removeSql = `BEGIN OPORRAK_PKG.DELETEUSUARIO(
  :idusua 
); END;
`;
const cambioSql = `BEGIN OPORRAK_PKG.CHANGEPASSWORD(
  :idusua,
  :pwdusu
); END;
`;
const olvidoSql = `BEGIN OPORRAK_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu,
  :seed
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.IDUSUA) {
    binds.idusua = context.IDUSUA;
    query += "WHERE uu.idusua = :idusua";
  } else if (context.USERID) {
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
  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idusua = await result.outBinds.idusua;
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const update = async (bind) => {
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const change = async (bind) => {
  let result;

  try {
    await simpleExecute(cambioSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const forgot = async (bind) => {
  let result;

  try {
    await simpleExecute(olvidoSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
