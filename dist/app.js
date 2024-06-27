"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./routes/usersRoutes");
const tasksRoutes_1 = require("./routes/tasksRoutes");
const errorHandler_1 = require("./middlewares/errorHandler");
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }
    initMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initRoutes() {
        const router = express_1.default.Router();
        this.app.use(router);
        (0, usersRoutes_1.userRoutes)(router);
        (0, tasksRoutes_1.tasksRoutes)(router);
    }
    initErrorHandling() {
        this.app.use(errorHandler_1.errorHandler);
    }
    listen() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
}
const app = new App();
app.listen();
