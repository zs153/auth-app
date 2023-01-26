export const tiposMovimiento = {
  crearDocumento: 0,
  modificarDocumento: 1,
  borrarDocumento: 2,
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearOficina: 6,
  modificarOficina: 7,
  borrarOficina: 8,
  crearCurso: 9,
  modificarCurso: 10,
  borrarCurso: 11,
  crearTurno: 12,
  modificarTurno: 13,
  borrarTurno: 14,
  crearMatricula: 15,
  modificarMatricula: 16,
  borrarMatricula: 17,
  desasignarFormulario: 18,
  crearSms: 19,
  modificarSms: 20,
  borrarSms: 21,
  actualizarPerfil: 22,
  crearFestivo: 23,
  borrarFestivo: 25,
  asignarFraude: 26,
  resolverFraude: 27,
  remitirFraude: 28,
  desasignarFraude: 29,
  crearHito: 30,
  modificarHito: 31,
  borrarHito: 32,
  crearSubtipo: 33,
  modificarSubtipo: 34,
  borrarSubtipo: 35,
  modificarPerfil: 36,
  asignarCita: 37,
  crearCita: 38,
  modificarCita: 39,
  borrarCita: 40,
  crearEstado: 41,
  modificarEstado: 42,
  borrarEstado: 43,
  insertarUsuarioTurno: 44,
  borrarUsuarioTurno: 45,
  insertarUsuarioMatricula: 46,
  crearTipoEvento: 47,
  modificarTipoEvento: 48,
  borrarTipoEvento: 49,
  crearTipoFraude: 50,
  modificarTipoFraude: 51,
  borrarTipoFraude: 52,
  crearCarga: 53,
  modificiarCarga: 54,
  borrarCarga: 55,
  crearUsuarioCurso: 56,
  borrarUsuarioCurso: 57,
  crearUsuarioMatricula: 58,
  borrarUsuarioMatricula: 59,
  cambioPassword: 60,
  olvidoPassword: 61,
  restablecerPassword: 62,
  registroUsuario: 63,
  activarUsuario: 64,
  matricularse: 65,
}
export const tiposPerfil = {
  general: 1,
  informador: 3,
  liquidador: 8,
}
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}
export const tiposVisualizacion = {
  todos: -1,
  pendientes: 1,
  resueltos: 2,
}
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
}
export const estadosCurso = {
  cerrado: 0,
  abierto: 1,
}
export const estadosMatricula = {
  cerrada: 0,
  abierta: 1,
}
export const estadosDocumento = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosFraude = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosCita = {
  disponible: 0,
  asignado: 1,
}
export const estadosSms = {
  pendiente: 0,
  enviado: 1,
}
export const estadosHito = {
  sancionAnulada: -1,
  propuestaLiquidacion: 1,
  liquidacion: 2,
  propuestaSancion: 3,
  sancion: 4,
}
export const tiposLiquidacion = {
  ingresar: 1,
  devolver: 2,
}
export const estadosCarga = {
  pendiente: 0,
  procesado: 1,
}
export const tiposEstado = {
  festivo: { ID: 0, DES: "FESTIVO O FIN DE SEMANA", COLOR: "#FF0000" },
  activo: { ID: 1, DES: "ACTIVO", COLOR: "#0101DF" },
  vacacion: { ID: 2, DES: "VACACION", COLOR: "#0D8004" },
  baja: { ID: 3, DES: "BAJA", COLOR: "#D80000" },
  traspaso: { ID: 4, DES: "TRASPASO", COLOR: "#61054A" },
  formacion: { ID: 5, DES: "FORMACION", COLOR: "#063780" },
  conciliacion: { ID: 6, DES: "CONCILIACION 9:30", COLOR: "#FEA500" },
  reunion: { ID: 7, DES: "REUNION", COLOR: "#DCD20D" },
  horas: { ID: 8, DES: "HORAS", COLOR: "#05CBF5" },
  telefono: { ID: 9, DES: "ATENCION TELEFÓNICA", COLOR: "#E6B000" },
  traspasado: { ID: 10, DES: "TRASPASADO", COLOR: "#808000" }
}

/* arrays */
export const arrTiposRol = [
  { id: 1, des: 'USUARIO' },
  { id: 2, des: 'RESPONSABLE' },
  { id: 3, des: 'ADMINISTRADOR' },
]
export const arrTiposPerfil = [
  { id: 1, des: 'GENERAL' },
  { id: 3, des: 'INFORMADOR' },
  { id: 8, des: 'LIQUIDADOR' },
]
export const arrEstadosUsuario = [
  { id: 0, des: 'RESERVA' },
  { id: 1, des: 'ACTIVO' },
]
export const arrEstadosCurso = [
  { id: 0, des: 'CERRADO' },
  { id: 1, des: 'ABIERTO' },
]
export const arrEstadosMatricula = [
  { id: 0, des: 'CERRADA' },
  { id: 1, des: 'ABIERTA' },
]
export const arrEstadosSms = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
export const arrEstadosFormulario = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrEstadosFraude = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrTiposLiquidacion = [
  { id: 1, des: 'INFRESAR' },
  { id: 2, des: 'DEVOLVER' },
]
export const arrTiposEstado = [
  { ID: 2, DES: "VACACIÓN", COLOR: "#0D8004" },
  { ID: 3, DES: "BAJA", COLOR: "#D80000" },
  { ID: 5, DES: "FORMACIÓN", COLOR: "#063780" },
  { ID: 6, DES: "CONCILIACIÓN 9:30", COLOR: "#FEA500" },
  { ID: 7, DES: "REUNION", COLOR: "#DCD20D" },
  { ID: 8, DES: "HORAS", COLOR: "#05CBF5" },
  { ID: 9, DES: "ATENCIÓN TELÉFONICA", COLOR: "#E6B000" },
]
export const arrTiposEstadoUsuario = [
  { ID: 2, DES: "VACACIÓN", COLOR: "#0D8004" },
  { ID: 3, DES: "BAJA", COLOR: "#D80000" },
  { ID: 5, DES: "FORMACIÓN", COLOR: "#063780" },
  { ID: 6, DES: "CONCILIACIÓN 9:30", COLOR: "#FEA500" },
  { ID: 7, DES: "REUNION", COLOR: "#DCD20D" },
  { ID: 8, DES: "HORAS", COLOR: "#05CBF5" },
]

export const arrColoresEstado = [
  { ID: 0, DES: "FESTIVO", COLOR: "#FF0000" },
  { ID: 1, DES: "ACTIVO", COLOR: "#0101DF" },
  { ID: 2, DES: "VACACIÓN", COLOR: "#0D8004" },
  { ID: 3, DES: "BAJA", COLOR: "#D80000" },
  { ID: 4, DES: "TRASPASO", COLOR: "#61054A" },
  { ID: 5, DES: "FORMACIÓN", COLOR: "#063780" },
  { ID: 6, DES: "CONCILIACIÓN 9:30", COLOR: "#FEA500" },
  { ID: 7, DES: "REUNIÓN", COLOR: "#DCD20D" },
  { ID: 8, DES: "HORAS", COLOR: "#05CBF5" },
  { ID: 9, DES: "ATENCIÓN TELEFÓNICA", COLOR: "#E6B000" },
  { ID: 10, DES: "TRASPASADO", COLOR: "#808000" }
]
