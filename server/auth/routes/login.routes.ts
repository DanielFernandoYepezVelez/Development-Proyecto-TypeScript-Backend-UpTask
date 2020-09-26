import { Router } from "express";

/* Controller */
import { LoginController } from '../controllers/login.controller';

/* Instanciando Controller */
const loginController = new LoginController();

export class LoginRoute {
  public router: Router = Router();

  constructor() {
    this.router.post("/login", loginController.login);
  }
}
