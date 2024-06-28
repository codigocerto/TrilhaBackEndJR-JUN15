"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const errorHandler = (error, request, response, next) => {
    if (error instanceof errors_1.BadRequestError ||
        error instanceof errors_1.UnauthorizedError ||
        error instanceof errors_1.NotFoundError) {
        return response.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
