import {
  version as versao,
  name as aplicacao,
  description as descricao,
  author as autor
} from '../../../../package.json';

export default (_, callback) => {
  callback(null, {
    versao,
    aplicacao,
    descricao,
    autor,
    ambiente: 'DEV',
  });
};
