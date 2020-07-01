import { Request, Response } from 'express';

import pool from '../libs/mysql2';
import { hapiJoi } from '../libs/hapiJoi';

import { PasswordUserDB } from '../helpers/passwordUserDB';

import { ITask } from '../models/ITask';

class TaskController {
  async getTasks(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { project_id } = req.params;

      const conn = await pool;
      const query = await conn.query('SELECT id FROM projects WHERE id = ?', [
        project_id,
      ]);

      const compareProject_id = new PasswordUserDB(query[0]).init(2, 7);

      if (compareProject_id === project_id) {
        const conn = await pool;
        const query = await conn.query(
          'SELECT id, task, state, project_id FROM tasks WHERE project_id = ?',
          [project_id]
        );

        return res.json({
          ok: true,
          tasks: query[0],
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
        error: e,
      });
    }
  }

  async newTask(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const { id_project } = req.params;
      const newTask: ITask = req.body;

      const conn = await pool;
      const query = await conn.query('SELECT id FROM projects WHERE id = ?', [
        id_project,
      ]);

      const compareProject_id = new PasswordUserDB(query[0]).init(2, 7);

      if (id_project === compareProject_id) {
        newTask.project_id = id_project;

        await hapiJoi.validateTask().validateAsync(newTask);

        const conn = await pool;
        const query = await conn.query('INSERT INTO tasks SET ?', [newTask]);

        return res.json({
          ok: true,
          message: 'Task Created Successfuly',
        });
      } else {
        return res.json({
          ok: false,
          message: 'Project No Exist!',
        });
      }
    } catch (e) {
      const { task } = req.body;

      if (task === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'Data Incomplete!',
        });
      }

      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const taskController = new TaskController();
