/* Sub-Routes */
import { TaskRoute } from './routes/task.routes';

/* Instanciando Sub-Routes */
const taskRoute = new TaskRoute();

export class TaskRoutes {
  public static task = taskRoute.router; 
}