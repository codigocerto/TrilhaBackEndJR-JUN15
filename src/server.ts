import { app } from "./app";
import { appConfig } from "./config/app.config";

app.get("/", (request, response) => {
  response.send("Hello, World!");
});

app.listen(appConfig.port, () =>
  console.log(`Server is Running on PORT: ${appConfig.port}`)
);
