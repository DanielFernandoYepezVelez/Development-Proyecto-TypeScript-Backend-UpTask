import { Router } from "express";

import { RegisterController } from "../controllers/register.controller";

export class RegisterRoute {
  public router: Router = Router();

  constructor() {
    this.router.post("/register", new RegisterController().register);
  }
}