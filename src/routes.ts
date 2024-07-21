import { Tasks } from '@/tasks';
import { Router } from 'express';

const routes = Router();

routes.use('/api/task', Tasks);

export { routes };
