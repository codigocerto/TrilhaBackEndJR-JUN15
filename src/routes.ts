import { Tasks } from '@/tasks';
import { Users } from '@/users';
import { Router } from 'express';

const routes = Router();

routes.use('/api/user', Users);
routes.use('/api/task', Tasks);

export { routes };
