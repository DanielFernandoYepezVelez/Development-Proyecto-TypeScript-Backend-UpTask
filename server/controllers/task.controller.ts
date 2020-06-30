import { Request, Response } from 'express';

import pool from '../libs/mysql2';

class TaskController {
  async getTasks(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { url_id, project_id } = req.params;
      const task: any = {};
      task.task = '';
      task.project_id = project_id;

      // const conn = await pool;
      // const query = await conn.query('INSERT INTO tasks SET ?', [task]);

      const conn = await pool;
      const query = await conn.query(
        'SELECT * FROM tasks WHERE project_id = ?',
        [project_id]
      );

      return res.json({
        ok: true,
        tasks: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async newTask(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { name } = req.body;
      const idUser = req.user;
      console.log(idUser);

      const conn = await pool;
      const query = await conn.query(
        'SELECT users.id AS USER_ID, users.name AS USER_NAME, projects.name AS PROJECT_NAME, projects.id AS PROJECT_ID FROM users INNER JOIN projects ON users.id = projects.user_id WHERE users.id = ? ',
        [idUser]
      );

      console.log(query[0]);

      return res.json({
        ok: true,
        message: 'Task Created Successfuly',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const taskController = new TaskController();
