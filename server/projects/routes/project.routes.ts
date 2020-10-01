import { Router } from 'express';

/* Controller */
import { ProjectController } from '../controllers/project.controller';

/* Instancias */
const projectController = new ProjectController();

export class ProjectRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/projects', projectController.projects);
        this.router.post('/project', projectController.createProject);
        this.router.get('/project/:project_url', projectController.project);
        this.router.put('/project/:project_url/:project_id', projectController.updateProject);
        this.router.delete('/project/:project_url/:project_id', projectController.deleteProject);
    }
}