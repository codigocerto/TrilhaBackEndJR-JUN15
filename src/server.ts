import express, { json } from 'express';
import { routes } from './routes';

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(json());

// Rotas
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
