import { Request, Response } from 'express';
import shortId from 'shortid';
import slug from 'slug';

import pool from '../libs/mysql2';
import { hapiJoi } from '../libs/hapiJoi';

import { IProject } from '../models/IProject';

class ProjectController {
  async getProjects(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const idUser = req.user;

      const conn = await pool;
      const query = await conn.query(
        'SELECT * FROM projects WHERE user_id = ?',
        [idUser]
      );

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

  // async getProject(req: Request, res: Response): Promise<Response<JSON>> {
  //   try {
  //     const { id } = req.params;
  //     let query: any;

  //     if (id) {
  //       const conn = await pool;
  //       query = await conn.query('SELECT * FROM projects WHERE id = ?', [id]);
  //     }

  //     return res.json({
  //       ok: true,
  //       projects: query[0],
  //     });
  //   } catch (e) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: e,
  //     });
  //   }
  // }

  async newProject(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const createProject: IProject = req.body;
      createProject.user_id = req.user;
      createProject.url = `${shortId.generate()}-${slug(
        createProject.name
      ).toLowerCase()}`;

      await hapiJoi.validateProject().validateAsync(createProject);

      const conn = await pool;
      await conn.query('INSERT INTO projects SET ?', [createProject]);

      return res.json({
        ok: true,
        message: 'Project Saved Successfully',
      });
    } catch (e) {
      const { name } = req.body;

      if (name === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'Data Incompleted!',
        });
      }

      return res.status(400).json({
        ok: false,
        err: e,
      });
    }
  }
}

export const projectController = new ProjectController();
