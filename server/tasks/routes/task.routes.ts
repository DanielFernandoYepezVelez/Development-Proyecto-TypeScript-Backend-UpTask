import { Router } from 'express';
import { authenticate } from 'passport';

/* Controller */
import { TaskController } from '../controllers/task.controller';

/* Middleware */
import { TaskMiddleware } from '../middlewares/task.middleware';

/* Instancias */
const taskController = new TaskController();
const taskMiddleware = new TaskMiddleware();

export class TaskRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/tasks/:project_id', [authenticate('jwt', { session: false })], taskController.tasks);
        this.router.patch('/task/:task_id', [authenticate('jwt', { session: false })], taskController.updateTask);
        this.router.delete('/task/:id_task', [authenticate('jwt', { session: false })], taskController.deleteTask);
        this.router.post('/task/:project_id', [authenticate('jwt', { session: false }), taskMiddleware.task], taskController.createTask);
    }
}