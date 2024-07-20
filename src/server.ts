import express from "express";

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
