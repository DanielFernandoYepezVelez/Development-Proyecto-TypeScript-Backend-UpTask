import { Mysql2 } from "../../libs/mysql2";

/* Intanciando Conexión De La Base De Datos */
const connection = new Mysql2();

/* Interfaces */
import { IUser } from '../models/IUser';

export class RegisterService {
  public async registerUser(user: IUser): Promise<string> {
    const userDB: IUser = { ...user, state: 1 };
    await connection.pool?.query('INSERT INTO users SET ?', [userDB]);
    return "User Registered Successfully";
  }
}