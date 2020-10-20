import { Request, Response } from 'express';

/* Services */
import { TaskService } from '../services/task.service';

/* Instancias */
const taskService = new TaskService();

export class TaskController {
    public async tasks(req: Request, res: Response): Promise<Response<JSON>> {
        const { project_id } = req.params;
        
        try {
            const tasks: object[] = await taskService.tasks(project_id);
            return res.json({ ok:true, tasks });

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }

    public async createTask(req: Request, res: Response): Promise<Response<JSON>> {
        const { name }  = req.body;
        const { project_id } = req.params;

        try {
            const tasks: object[] = await taskService.createTask(project_id, name);
            return res.json({ ok:true, message: 'Successfully Created Task', tasks });

        } catch (e) {
            return res.status(400).json({ ok:false, error: e });
        }
    }

    /* Solo Cambia El Estado Si Esta Completada O No(1 - 0) */
    public async updateTask(req: Request, res: Response): Promise<Response<JSON>> {
        const { task_id } = req.params;

        try {
            const message: string = await taskService.updateTask(task_id);
            return res.json({ ok:true, message });

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<Response<JSON>> {
        const { id_task } = req.params;

        try {
            const message: string = await taskService.deleteTask(id_task);
            return res.json({ ok:true, message });

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }
}