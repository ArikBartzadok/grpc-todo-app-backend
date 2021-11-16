import { default as metodoListarControle } from '../../../../../apresentacao/controles/consultas/listar'

const fabricar = () => {
  // aqui deve ser injetada a instancia da conexão com o banco de dados...
  return metodoListarControle;
};

export default fabricar;
