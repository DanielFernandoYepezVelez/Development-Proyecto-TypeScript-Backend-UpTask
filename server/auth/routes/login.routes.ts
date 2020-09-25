import { Router } from "express";

/* Controller */
import { LoginController } from "../controllers/login.controller";

export class LoginRoute {
  public router: Router = Router();

  constructor() {
    this.router.post("/login", new LoginController().login);
  }
}
