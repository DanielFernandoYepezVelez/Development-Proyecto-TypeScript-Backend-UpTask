import { Router } from 'express';

import { taskController } from '../controllers/task.controller';

class TaskRoutes {
  constructor(public router: Router) {
    this.router.get('/tasks', taskController.getTasks);
  }
}

const taskRoutes = new TaskRoutes(Router());
export default taskRoutes.router;
