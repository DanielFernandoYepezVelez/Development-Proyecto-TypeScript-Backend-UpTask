import { Request, Response } from 'express';

import pool from '../libs/mysql2';

class ProjectController {
  async getProjects(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const conn = await pool;
      const query = await conn.query('SELECT * FROM projects');

      return res.json({
        ok: true,
        projects: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        err: e,
      });
    }
  }

  async getProject(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { id } = req.params;
      let query: any;

      if (id) {
        const conn = await pool;
        query = await conn.query('SELECT * FROM projects WHERE id = ?', [id]);
      }

      return res.json({
        ok: true,
        projects: query[0],
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
