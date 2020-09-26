import { Request, Response } from "express";

/* Services */
import { RegisterService } from '../services/register.service';

/* Instanciando Services */
const registerService = new RegisterService();

/* Interfaces */
import { IUser } from '../models/IUser';

export class RegisterController { 
  public async register(req: Request, res: Response): Promise<Response<JSON>> {
    const user: IUser = { ...req.body };
    
    try {
      const message: string = await registerService.registerUser(user);
      return res.json({ ok: true, message });

    } catch (e) {
      return res.status(400).json({ ok: false, message: "User No Registered Successfully", error: e });
    }
  }
}