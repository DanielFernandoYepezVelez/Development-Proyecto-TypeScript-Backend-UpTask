import {Request, Response, NextFunction} from 'express';

/* Register Schema */
import { RegisterSchema } from '../schemas/register.schema';

/* Instanciando Register Schema */
const registerSchema = new RegisterSchema();

export class RegisterMiddleware {
    public async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { error } = await registerSchema.register().validate(req.body);
        
        if (error) {
            return res.status(400).json({ ok: false, error: error?.details[0].message });
          }

          return next();
    }
}