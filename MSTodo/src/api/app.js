export default ({ controles, middlewares }) => {

  return {
    padrao: (_, callback) => controles.padrao(_, callback),
    listar: (_, callback) => controles.listar(_, callback)
  }
}
