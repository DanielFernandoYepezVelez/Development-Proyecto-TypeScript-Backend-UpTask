import { Request, Response } from "express";

/* Services */
import { LoginService } from '../services/login.service';

/* Interfaces */
import { ILogin } from "../models/ILogin";

/* Instanciando Services */
const loginService = new LoginService();

export class LoginController {
  public async login(req: Request, res: Response): Promise<Response<JSON>> {
    const user: ILogin = { ...req.body };

    try {
      const token: string = await loginService.login(user);
      return res.json({ ok: true, message: "User Logged In Successfully", token});
      
    } catch (e) {
      return res.status(400).json({ ok: false, error: e });
    }
  }
}
