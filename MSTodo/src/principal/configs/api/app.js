export default {
  ambiente: process.env.AMBIENTE || 'DEV',
  url: process.env.URL || '127.0.0.1',
  porta: process.env.PORTA || '50051'
};
