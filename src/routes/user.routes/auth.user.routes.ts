import { Router } from "express";
import { AuthUserController } from "../../controllers/user/AuthUserController";


const auth = Router();

auth.post("/v1/session", new AuthUserController().handle);

export default auth;
