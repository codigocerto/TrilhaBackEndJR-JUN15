import express, { Application } from "express";

class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.middlewaresInitialize();
  }

  middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
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
