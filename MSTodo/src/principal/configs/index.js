import { default as app } from './api/app';
import { default as mongodb } from './infra/mongodb';
import { default as redis } from './infra/redis';

export default {
  app,
  mongodb,
  redis
};
