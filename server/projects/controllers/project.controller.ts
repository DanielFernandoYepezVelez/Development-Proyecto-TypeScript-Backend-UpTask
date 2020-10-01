import { Request, Response } from "express";

export class ProjectController {
    public async projects(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Solicitar Todos Los Proyectos Existentes De Ese Usuario En Particular');
            return res.json({ok: true});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async project(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Solicitar Un Proyecto Existente Por Medio De La Url De Ese Usuario En Particular');
            return res.json({ok: true});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async createProject(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Crear Un Nuevo Proyecto Para Un Usuario En Particular');
            return res.json({ok: true});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async updateProject(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Actualizar Un Proyecto Para Un Usuario En Particular');
            return res.json({ok: true});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }

    public async deleteProject(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Eliminar Un Proyecto Para Un Usuario En Particular');
            return res.json({ok: true});
            
        } catch (e) {
            return res.status(400).json({ok: false, error: e});
        }
    }
}