import { Response, Request } from "express";
import { UserService } from "../../services/user/UserService";
import { UserRequest } from "../../models/interfaces/user/UserRequest";
import { HttpResponse } from "../../infra/helper/HttpResponse"
import { HttpRequestDTO } from "../../infra/DTO/Http/HttpRequestDTO";
import { HttpResponseDTO } from "../../infra/DTO/Http/HttpResponseDTO";
import { IUserController } from "./IUserController";


class UserController implements IUserController {
  constructor(private userService: UserService) { }

  async handle(req: HttpRequestDTO, res: Response): Promise<HttpResponseDTO> {
    const { name, email, password }: UserRequest = req.body;

    try {
      const user = await this.userService.execute({ name, email, password });

      return HttpResponse.ok(res, user);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "EMAIL_INCORRECT" || error.message === "EMAIL_ALREADY_EXIST") {
          return HttpResponse.badRequest(res, error);
        } else {
          return HttpResponse.serverError(res);
        }
      } else {
        return HttpResponse.serverError(res);
      }
    }

  }

  async buscarPorEmail(req: Request, res: Response) {
    const user_id = req?.user_id;
    const user = await this.userService.findById(user_id)
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user_id = req.query.user_id as string;

    if (!user_id) {
      return HttpResponse.badRequest(res, new Error('User ID is required'));
    }

    try {
      const removeUser = await this.userService.delete({ user_id });

      // Verifica se a deleção foi bem-sucedida
      if (removeUser) {
        return HttpResponse.ok(res, { message: 'User deleted successfully' });
      } else {
        return HttpResponse.badRequest(res, new Error('User not found or could not be deleted'));
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return HttpResponse.serverError(res);
      }
      return HttpResponse.serverError(res);
    }
  }
}

export { UserController };
