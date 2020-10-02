import { Request, Response, NextFunction } from 'express';

/* Task Schema */
import { TaskSchema } from '../schemas/task.schema';

/* Instancia Task Schema */
const taskSchema = new TaskSchema();

export class TaskMiddleware {
    public async task(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { error } = await taskSchema.task().validate(req.body);
        
        if (error) {
            return res.status(400).json({ ok: false, error: error.details[0].message });
          }

          return next();
    }
}