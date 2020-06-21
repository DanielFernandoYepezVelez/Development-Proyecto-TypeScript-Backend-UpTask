import { Request, Response } from 'express';

import pool from '../libs/mysql2';

class TaskController {
  async getTasks(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const conn = await pool;
      const query = await conn.query('SELECT * FROM tasks');

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
}

export const taskController = new TaskController();
