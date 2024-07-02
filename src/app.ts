import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use("/",router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(port, () => {
    console.log("Servidor está rodando na porta 3333");
})
