import pool from "../../libs/mysql2";
import { UserPassword } from "../libs/bcrypt.lib";

/* Interfaces */
import { IRegister } from "../interfaces/register.interface";

/* Instancias */
/* 
    NO SE SI ES CORRECTO HACERLO ASI, POR QUE INSTANCIA
    UNA NUEVA CONEXIÓN CADA VEZ QUE SE CREE UN OBJETO
*/
/* Intanciando Conexión De La Base De Datos */
// const connection = new Mysql2();
const hash = new UserPassword();

export class RegisterService {
  public async registerUser(user: IRegister): Promise<string> {    
    const { email, password } = user;
    const [rows, fields]: object[][] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);

    if([rows, fields][0][0]) {
      throw new Error("Email Ya Existe!").message;       
    }

    const passwordDB: string = await hash.encryptPassword(password);
    const userDB: IRegister = { ...user, password: passwordDB, state: 1 };
    
    await pool.query("INSERT INTO users SET ?", [userDB]);
    return "User Registered Successfully";
  }
}
