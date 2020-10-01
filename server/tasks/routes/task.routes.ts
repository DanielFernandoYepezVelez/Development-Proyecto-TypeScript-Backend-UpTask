import { Router } from 'express';

/* Controller */
import { TaskController } from '../controllers/task.controller';

/* Instancias */
const taskController = new TaskController();

export class TaskRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/tasks/:project_id', taskController.tasks);
        this.router.patch('/task/:task_id', taskController.updateTask);
        this.router.delete('/task/:id_task', taskController.deleteTask);
        this.router.post('/task/:project_id', taskController.createTask);
    }
}