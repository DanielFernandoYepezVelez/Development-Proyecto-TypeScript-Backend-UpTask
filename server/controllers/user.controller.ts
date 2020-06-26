import { Request, Response } from 'express';

import pool from '../libs/mysql2';
import { Jwt } from '../libs/jwt';
import { hapiJoi } from '../libs/hapiJoi';
import { userPassword } from '../libs/bcrypt';

import { IUserSignUp, IUserSignIn } from '../models/IUser';

import { PasswordUserDB } from '../helpers/passwordUserDB';

/* MEJORES REST-API VÁLIDADAS HASTA EL MOMENTO */
class UserController {
  async signup(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const userSignUp: IUserSignUp = req.body;

      await hapiJoi.validateUser().validateAsync(userSignUp);

      userSignUp.password = await userPassword.encryptPassword(
        userSignUp.password
      );

      const conn = await pool;
      await conn.query('INSERT INTO users SET ? ', [userSignUp]);

      return res.json({
        ok: true,
        message: 'User Registered Successfully',
      });
    } catch (e) {
      const { name, email, password }: IUserSignUp = req.body;

      if (name === undefined || password === undefined || email === undefined) {
        return res.status(400).json({
          ok: false,
          error: 'Data Incompleted!',
        });
      }

      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async signin(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const userSignIn: IUserSignIn = req.body;

      await hapiJoi.validateUserLogin().validateAsync(userSignIn);

      const conn = await pool;
      const query = await conn.query(
        'SELECT password FROM users WHERE email = ?',
        [userSignIn.email]
      );

      if (!(JSON.stringify(query[0]) === '[]')) {
        /* Obtengo El Password De La Base De Datos(Forma Tipo String) */
        let passwordUserDB = new PasswordUserDB(query[0]);
        const passwordDB = passwordUserDB.init(3, 14);

        /* Válido Las Contraseñas */
        const matchPassword = await userPassword.validatePassword(
          userSignIn.password,
          passwordDB
        );

        if (matchPassword) {
          const conn = await pool;
          let query = await conn.query('SELECT id FROM users WHERE email = ?', [
            userSignIn.email,
          ]);

          /* Obtengo El Id De La Base De Datos Para Almacenar En El Token(Forma Tipo String)*/
          let userDB = new PasswordUserDB(query[0]);
          const idUser = Number(userDB.init(2, 7));

          /* Creo El Token Con El Id Del Usuario */
          const tokenUser = new Jwt().createToken(idUser);

          /* Actualizar El Estado De Un Usuario Cuando Inicia Sesión Por Medio De Su Email */
          query = await conn.query(
            'UPDATE users SET state = ? WHERE email = ?',
            [1, userSignIn.email]
          );

          return res.json({
            ok: true,
            message: 'User Login Successfully',
            tokenUser,
          });
        } else {
          return res.status(401).json({
            ok: false,
            message: 'La Contraseña No Es Válida',
          });
        }
      } else {
        return res.status(401).json({
          ok: false,
          message: 'El email No Existe!',
        });
      }
    } catch (e) {
      const { email, password }: IUserSignIn = req.body;

      if (email === undefined || password === undefined) {
        return res.status(400).json({
          ok: false,
          error: 'Data Incompleted!',
        });
      }

      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const userController = new UserController();
