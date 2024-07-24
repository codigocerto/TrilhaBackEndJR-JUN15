import cors from 'cors';
import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import swaggerSchema from './swagger.json';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(cors({ origin: '*' }));

app.use(json());

// Rotas
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSchema));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
