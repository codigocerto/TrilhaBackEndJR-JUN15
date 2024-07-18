require("dotenv").config();

export const appConfig = {
  port: process.env.PORT ?? 8080,
};
