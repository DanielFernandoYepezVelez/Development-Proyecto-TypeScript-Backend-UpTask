import { Request, Response } from "express";

import { LoginService } from '../services/login.service';

const loginService = new LoginService();

export class LoginController {
  public async login(req: Request, res: Response): Promise<Response<JSON>> {
    const user = { ...req.body };

    try {
      // console.log(user);

      const login = await loginService.login();

      // console.log(login);

      return res.json({
        ok: true,
        message: "User Logged In Successfully",
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        message: "User No Logged In Successfully",
        error: e,
      });
    }
  }
}
