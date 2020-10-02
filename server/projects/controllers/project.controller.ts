import { Request, Response } from "express";

/* Services */
import { ProjectService } from '../services/project.service';

/* Instancias */
const projectService = new ProjectService();

export class ProjectController {
    public async projects(req: Request, res: Response): Promise<Response<JSON>> {
        const idUser = req.user;

        try {
            const projects: object[] = await projectService.projects(idUser);
            return res.json({ok: true, projects});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async project(req: Request, res: Response): Promise<Response<JSON>> {
        const idUser = req.user;
        const { project_url } = req.params;
        
        try {
            const project: object[] = await projectService.project(project_url, idUser);
            return res.json({ok: true, project});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async createProject(req: Request, res: Response): Promise<Response<JSON>> {
        const  idUser  = req.user;
        const { name } = req.body;

        try {
            const message: string = await projectService.createProject(name, idUser);
            return res.json({ ok: true, message });
            
        } catch (e) {
            return res.status(400).json({ ok: false, error: e });
        }
    }

    public async updateProject(req: Request, res: Response): Promise<Response<JSON>> {
        const idUser = req.user;
        const { name } = req.body;
        const { project_url, project_id } = req.params;

        try {
            const message: string = await projectService.updateProject(name, project_url, project_id, idUser);
            return res.json({ok: true, message});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async deleteProject(req: Request, res: Response): Promise<Response<JSON>> {
        const idUser = req.user;
        const { project_url, project_id } = req.params;

        try {
            const message = await projectService.deleteProject(project_id, project_url, idUser);
            return res.json({ok: true, message});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }
}