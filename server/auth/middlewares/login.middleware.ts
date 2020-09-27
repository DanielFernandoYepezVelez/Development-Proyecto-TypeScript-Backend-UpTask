import {Request, Response, NextFunction} from 'express';

/* Login Schema */
import { LoginSchema } from '../schemas/login.schema';

/* Instanciando Login Schema */
const loginSchema = new LoginSchema();

export class LoginMiddleware {
    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { error } = await loginSchema.login().validate(req.body);
        
        if (error) {
            return res.status(400).json({ ok: false, error: error?.details[0].message });
          }

          return next();
    }
}