import { Request, Response } from 'express';

export class TaskController {
    public async tasks(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Obtener Todas Las Tareas Creadas En Un Proyecto De Un Usuarios En Particular');
            return res.json({ok:true});

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }

    public async createTask(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Crear Una Nueva Tarea De Un Proyecto De Un Usuarios En Particular');
            return res.json({ok:true});

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }

    public async updateTask(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Actualiza Una Tarea De Un Proyecto De Un Usuarios En Particular');
            return res.json({ok:true});

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<Response<JSON>> {
        try {
            console.log('Elimina Una Tarea De Un Proyecto De Un Usuarios En Particular');
            return res.json({ok:true});

        } catch (e) {
            return res.status(400).json({ok:false, error: e});
        }
    }
}