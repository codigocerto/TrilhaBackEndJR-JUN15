import { HttpRequestDTO } from "../../infra/DTO/Http/HttpRequestDTO";
import { HttpResponseDTO } from "../../infra/DTO/Http/HttpResponseDTO";
import { Response } from "express";

export interface IUserController {
    handle(request: HttpRequestDTO, res: Response): Promise<HttpResponseDTO>;
}
