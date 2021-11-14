import grpc from 'grpc';

const protocoloTodo = grpc.load('todo.proto');
const servidor = new grpc.Server();

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

servidor.addService(protocoloTodo.ServicoTodo.service, {
  inserir: (chamada, callback) => {
    let todo = chamada.request;

    let novoRegistro = alterarDados({
      id: (bancoFake.length - 1),
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
    callback(null, alterarDados(item.id, item.selecionado));
  }
});

servidor.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Servidor rodando...');
servidor.start();
