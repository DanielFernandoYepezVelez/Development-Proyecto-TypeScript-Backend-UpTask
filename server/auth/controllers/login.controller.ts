import { Request, Response } from "express";

export class LoginController {
  public login(req: Request, res: Response): Response<JSON> {
    try {

        console.log('Trabajando Desde El Login Nueva Arquitectura');

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
