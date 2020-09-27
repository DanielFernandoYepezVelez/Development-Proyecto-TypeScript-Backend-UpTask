import { Request, Response } from "express";

/* Services */
import { RegisterService } from '../services/register.service';

/* Instanciando Services */
const registerService = new RegisterService();

/* Interfaces */
import { IRegister } from '../models/IRegister';

export class RegisterController { 
  public async register(req: Request, res: Response): Promise<Response<JSON>> {
    const user: IRegister = { ...req.body };
    
    try {
      const message: string = await registerService.registerUser(user);
      return res.json({ ok: true, message });

    } catch (e) {
      return res.status(400).json({ ok: false, error: e });
    }
  }
}