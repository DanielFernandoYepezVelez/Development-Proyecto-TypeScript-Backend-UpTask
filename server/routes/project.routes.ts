import { Router } from 'express';

import { projectController } from '../controllers/project.controller';
import passport from 'passport';

class ProjectRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/projects',
      passport.authenticate('jwt', { session: false }),
      projectController.getProjects
    );

    this.router.post(
      '/newProject',
      passport.authenticate('jwt', { session: false }),
      projectController.newProject
    );

    this.router.get(
      '/project/url/:url_id',
      passport.authenticate('jwt', { session: false }),
      projectController.getProjectUrl
    );

    this.router.put(
      '/project/:project_url/:project_id',
      passport.authenticate('jwt', { session: false }),
      projectController.getProjectId
    );

    this.router.delete(
      '/project/:project_url/:project_id',
      passport.authenticate('jwt', { session: false }),
      projectController.deleteProject
    );
  }
}

const projectRoutes = new ProjectRoutes(Router());
export default projectRoutes.router;
