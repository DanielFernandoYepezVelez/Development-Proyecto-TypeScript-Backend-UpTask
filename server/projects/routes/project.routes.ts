import { Router } from 'express';
import  {authenticate } from 'passport';

/* Controller */
import { ProjectController } from '../controllers/project.controller';

/* Middlewares */
import { ProjectMiddleware } from '../middlewares/project.middleware';

/* Instancias */
const projectController = new ProjectController();
const projectMiddleware = new ProjectMiddleware();

export class ProjectRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/projects', [ authenticate('jwt', { session: false }) ], projectController.projects);
        this.router.get('/project/:project_url', [ authenticate('jwt', { session: false }) ], projectController.project);
        this.router.post('/project', [ authenticate('jwt', { session: false }), projectMiddleware.project ], projectController.createProject);
        this.router.delete('/project/:project_url/:project_id', [ authenticate('jwt', { session: false }) ], projectController.deleteProject);
        this.router.put('/project/:project_url/:project_id', [ authenticate('jwt', { session: false }), projectMiddleware.project ], projectController.updateProject);
    }
}