import { Request, Response } from "express";
import { HttpRequestDTO } from "../../DTO/Http/HttpRequestDTO";

export class ExpressRouterAdapter {
    static adapt(controller: any, method: string) {
        return async (req: Request, res: Response) => {
            const httpRequest: HttpRequestDTO = {
                body: req.body,
                params: req.params,
                headers: req.headers,
                query: req.query
            }
            await controller[method](httpRequest, res)
        };
    }
}