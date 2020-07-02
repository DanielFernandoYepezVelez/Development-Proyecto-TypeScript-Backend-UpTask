import { Router } from 'express';

import passport from 'passport';
import { taskController } from '../controllers/task.controller';

class TaskRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/tasks/:project_id',
      passport.authenticate('jwt', { session: false }),
      taskController.getTasks
    );

    this.router.post(
      '/newtask/:id_project',
      passport.authenticate('jwt', { session: false }),
      taskController.newTask
    );

    this.router.patch(
      '/task/:task_id',
      passport.authenticate('jwt', { session: false }),
      taskController.updateTask
    );

    this.router.delete(
      '/task/:id_task',
      passport.authenticate('jwt', { session: false }),
      taskController.deleteTask
    );
  }
}

const taskRoutes = new TaskRoutes(Router());
export default taskRoutes.router;
