import { Request, Response } from "express";

/* Interfaces */
import { IUser } from "../models/IUser";

export class RegisterController {
  public register(req: Request, res: Response): Response<JSON> {
    const user: IUser = {
      ...req.body,
    };

    try {
      console.log('Desde La NUeva Arquitectura', user);

      return res.json({
        ok: true,
        message: "User Registered Successfully",
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        message: "User No Registered Successfully",
        error: e,
      });
    }
  }
}