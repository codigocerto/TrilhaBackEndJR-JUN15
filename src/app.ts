import express, { Application } from "express";
import { userRoutes } from "./routes/usersRoutes";
import { tasksRoutes } from "./routes/tasksRoutes";
import { errorHandler } from "./middlewares/errorHandler";

class App {
  app: Application;
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes() {
    const router = express.Router();
    this.app.use(router);
    userRoutes(router);
    tasksRoutes(router);
  }

  private initErrorHandling() {
    this.app.use(errorHandler);
  }

  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
  }
}

const app = new App();
app.listen();
