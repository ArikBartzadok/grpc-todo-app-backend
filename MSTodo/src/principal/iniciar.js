import grpc from 'grpc';
import { default as configs } from './configs';
import { default as fabricarApp } from './fabricas/api/fabricarApp';

const protocoloTodo = grpc.load('todo.proto');
const servidor = new grpc.Server();

const metodosApp = fabricarApp();

servidor.addService(protocoloTodo.ServicoTodo.service, {
  ...metodosApp
});

const host = `${configs.app.url}:${configs.app.porta}`;
const gatilho = () => {
  console.log('[INFO] >> Servidor rodando');
  servidor.start();
};

servidor.bindAsync(
  host,
  grpc.ServerCredentials.createInsecure(),
  gatilho
);
