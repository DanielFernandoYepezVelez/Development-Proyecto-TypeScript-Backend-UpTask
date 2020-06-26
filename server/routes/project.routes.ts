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
  }
}

const projectRoutes = new ProjectRoutes(Router());
export default projectRoutes.router;
