import { default as app } from '../../../api/app';

import { default as metodoPadraoControleFabrica } from '../apresentacao/controles/padrao/padrao';
import { default as metodoListarControleFabrica } from '../apresentacao/controles/consultas/listar';

// isso ficaria dentro de um metodo do repositorio
const bancoFake = [
  { id: 1, finalizado: false, titulo: 'Título 1'},
  { id: 2, finalizado: false, titulo: 'Título 2'},
];

function alterarDados({ id, finalizado = false, titulo }) {
  if (!titulo) titulo = 'não encontrada';
  let res = { id, finalizado, titulo };

  for (let i = 0; i < bancoFake.length; i++) {
    if (bancoFake[i].id === id) {
      bancoFake[i].finalizado = finalizado;
      res = bancoFake[i];
    }
  }

  return res;
};

// estes seriam varios arquivos dentro dos apresentacao/controles/
const gerarMetodosApp = () => ({
  inserir: (chamada, callback) => {
    let todo = chamada.request;

    let novoRegistro = alterarDados({
      id: (bancoFake.length + 1),
      finalizado: false,
      titulo: todo.titulo
    });

    if (todo.titulo) bancoFake.push(novoRegistro);

    // erros, dados a serem retornados...
    callback(null, novoRegistro);
  },
  listar: (_, callback) => {
    callback(null, bancoFake);
  },
  selecionar: (chamada, callback) => {
    let item = chamada.request;
    callback(null, alterarDados({
      id: item.id,
      finalizado: item.selecionado
    }));
  }
});

const fabricar = () => {
  const padrao = metodoPadraoControleFabrica();
  const listar = metodoListarControleFabrica();

  // dentro da fabrica de middlewares devem vis as conexões com o mongodb e redis.
  // metodos devem vir de dentro da fabrica de apresentacao, i inseridos dentro de controles: {}
  const middlewares = {};

  const controles = {
    padrao,
    listar
  };

  const appConfigurado = app({ controles, middlewares });

  return appConfigurado;
};

export default fabricar;
