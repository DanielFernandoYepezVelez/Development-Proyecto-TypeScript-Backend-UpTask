import {Request, Response, NextFunction} from 'express';

/* Project Schema */
import { ProjectSchema } from '../schemas/project.schema';

/* Instanciando Project Schema */
const projectSchema = new ProjectSchema();

export class ProjectMiddleware {
    public async project(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { error } = await projectSchema.project().validate(req.body);
        
        if (error) {
            return res.status(400).json({ ok: false, error: error.details[0].message });
          }

          return next();
    }
}