/* Sub-Routes */
import { ProjectRoute } from './routes/project.routes';

/* Instanciando Sub-Routes */
const projectRoute = new ProjectRoute();

export class ProjectRoutes {
  public static project = projectRoute.router; 
}