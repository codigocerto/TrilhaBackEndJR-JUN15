import { Router } from "express";
import user from "./user.routes/user.routes";
import auth from "./user.routes/auth.user.routes";
import task from "./task.routes/task.routes";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/task", task);

routes.use("/", (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'Okay',
        timestamp: Date.now()
    };
    try {
      res.send(healthcheck);
    } catch (error: unknown) {
      if (error instanceof Error) {
          healthcheck.message = error.message;
      } else {
          healthcheck.message = 'An unknown error occurred';
      }
      res.status(503).send(healthcheck);
  }
})

routes.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de serviço"
  })
});

export default routes;
