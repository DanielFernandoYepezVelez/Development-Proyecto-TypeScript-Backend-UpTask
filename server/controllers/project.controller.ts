import { Request, Response } from 'express';
import shortId from 'shortid';
import slug from 'slug';

import pool from '../libs/mysql2';
import { hapiJoi } from '../libs/hapiJoi';
import { PasswordUserDB } from '../helpers/passwordUserDB';

import { IProject } from '../models/IProject';

class ProjectController {
  async getProjects(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const idUser = req.user;

      const conn = await pool;
      const query = await conn.query(
        'SELECT id, name, url, user_id FROM projects WHERE user_id = ?',
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

  async getProjectUrl(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { url_id } = req.params;

      const conn = await pool;
      const query = await conn.query('SELECT url FROM projects WHERE url = ?', [
        url_id,
      ]);

      /* Validación Para La Url Del Proyecto */
      const compareProjectUrl = new PasswordUserDB(query[0]).init(3, 9);

      if (url_id === compareProjectUrl) {
        const conn = await pool;
        const query = await conn.query(
          'SELECT id, name, url, user_id FROM projects WHERE url = ?',
          [url_id]
        );

        return res.json({
          ok: true,
          project: query[0],
        });
      } else {
        return res.json({
          ok: false,
          message: 'Url Project No Exist!',
        });
      }
    } catch (e) {
      return res.status(400).json({
        ok: false,
        err: e,
      });
    }
  }

  async getProjectId(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { project_url, project_id } = req.params;
      const updateProject: IProject = req.body;

      updateProject.url = project_url;
      updateProject.user_id = req.user;

      await hapiJoi.validateProject().validateAsync(updateProject);

      const conn = await pool;
      const query = await conn.query(
        'SELECT id FROM projects WHERE id = ? AND url = ?',
        [project_id, project_url]
      );

      const projectIdDB = new PasswordUserDB(query[0]).init(2, 7);

      if (project_id === projectIdDB) {
        const conn = await pool;
        await conn.query('UPDATE projects SET ? WHERE id = ?', [
          updateProject,
          project_id,
        ]);

        return res.json({
          ok: true,
          message: 'Project Updated Successfully',
        });
      } else {
        return res.status(400).json({
          ok: false,
          message: 'Project No Exist!',
        });
      }
    } catch (e) {
      const { name } = req.body;

      if (name === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'Data Incomplete!',
        });
      }

      return res.status(400).json({
        ok: false,
        err: e,
      });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { project_url, project_id } = req.params;

      const conn = await pool;
      const query = await conn.query(
        'SELECT id FROM projects WHERE id = ? AND url = ?',
        [project_id, project_url]
      );

      /* Confirma Que El Project_id Si Exista En La Base De Datos */
      const projectIdDB = new PasswordUserDB(query[0]).init(2, 7);

      if (project_id === projectIdDB) {
        const conn = await pool;
        await conn.query('DELETE FROM projects WHERE id = ?', [project_id]);

        return res.json({
          ok: true,
          message: 'Project Deleted Successfully',
        });
      } else {
        return res.status(400).json({
          ok: false,
          message: 'Project No Exist!',
        });
      }
    } catch (e) {
      return res.status(400).json({
        ok: false,
        message: e,
      });
    }
  }
}
export const projectController = new ProjectController();
