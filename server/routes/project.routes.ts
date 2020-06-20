import { Router } from "express";

import { projectController } from "../controllers/project.controller";

class ProjectRoutes {
  constructor(public router: Router) {
    this.router.get("/projects", projectController.getProjects);
  }
}

const projectRoutes = new ProjectRoutes(Router());
export default projectRoutes.router;
