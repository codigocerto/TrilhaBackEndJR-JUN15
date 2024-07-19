import { app } from "./app";
import { appConfig } from "./config/app.config";
import cors from "cors";

const opt: cors.CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(opt));

app.listen(
  {
    port: appConfig.port,
    host: "RENDER" in process.env ? "0.0.0.0" : "localhost",
  },
  () => {
    console.log(`Server is running on port ${appConfig.port}`);
  }
);
