import { Response } from "express";
import { HttpResponseDTO } from "../DTO/Http/HttpResponseDTO";

class HttpResponse {
    static ok<T>(res: Response, data: T): HttpResponseDTO {
        res.status(200).json(data);
        return { status: 200, data };
    }

    static badRequest(res: Response, error: Error): HttpResponseDTO {
        const errorMessage = { error: error.message };
        res.status(400).json(errorMessage);
        return { status: 400, data: errorMessage}
    }

    static serverError(res: Response): HttpResponseDTO {
        const errorMessage = { status: 'error', message: 'Internal server error.' }
        res.status(500).json(errorMessage);
        return { status: 500, data: errorMessage }
    }
}

export { HttpResponse };
