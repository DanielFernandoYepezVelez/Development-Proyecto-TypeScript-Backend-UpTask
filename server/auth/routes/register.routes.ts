import { Router } from "express";

/* Controller */
import { RegisterController } from "../controllers/register.controller";

/* Middleware */
import { RegisterMiddleware } from '../middlewares/register.middleware';

/* Instancias */
const registerController = new RegisterController();
const registerMiddleware = new RegisterMiddleware();

export class RegisterRoute {
  public router: Router = Router();

  constructor() {
    this.router.post("/register", [registerMiddleware.register], registerController.register);
  }
}