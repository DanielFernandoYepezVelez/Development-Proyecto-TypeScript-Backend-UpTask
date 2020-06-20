import { Request, Response } from "express";

class ProjectController {
  public async getProjects(
    req: Request,
    res: Response
  ): Promise<Response<JSON>> {
    try {
      console.log("Trabajando Desde Controller");

      return res.json({
        ok: true,
        projects: "All Projects User",
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        err: e,
      });
    }
  }
}

export const projectController = new ProjectController();
