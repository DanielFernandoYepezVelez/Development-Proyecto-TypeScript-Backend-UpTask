import { Router } from "express";

/* Controller */
import { LoginController } from '../controllers/login.controller';

/* Middleware */
import { LoginMiddleware } from '../middlewares/login.middleware';

/* Instancias */
const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

export class LoginRoute {
  public router: Router = Router();

  constructor() {
    this.router.post("/login", [loginMiddleware.login], loginController.login);
    this.router.post("/login/google", [loginMiddleware.loginGoogle], loginController.loginGoogle);
  }
}
