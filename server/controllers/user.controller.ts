import { Request, Response } from 'express';

class UserController {
  async signup(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        message: 'User Registered Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async signin(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        message: 'User Login Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const userController = new UserController();
