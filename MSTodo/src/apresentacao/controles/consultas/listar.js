const bancoFake = [
  { id: 1, finalizado: false, titulo: 'Título 1'},
  { id: 2, finalizado: false, titulo: 'Título 2'},
];

export default (_, callback) => {
  callback(null, bancoFake);
};
