import { Jwt } from '../libs/jwt';
import pool from "../../libs/mysql2";
import { UserPassword } from "../libs/bcrypt";

/* Interfaces */
import { ILogin } from "../models/ILogin";

/* Instancias */
/* 
    NO SE SI ES CORRECTO HACERLO ASI, POR QUE INSTANCIA
    UNA NUEVA CONEXIÓN CADA VEZ QUE SE CREE UN OBJETO
*/
/* Instanciando Conexión De La Base De Datos */
// const connection = new Mysql2();
const jwt = new Jwt();
const matchHash = new UserPassword();

export class LoginService {
  public async login(user: ILogin): Promise<string> {

        const { email, password } = user;
        const [ rows, fields,]: object[][] = await pool.query("SELECT id, email, password FROM users WHERE email = ?", [email]);

        if (![rows, fields][0][0]) {
            throw new Error("User No Exist!").message;
        }

        const userDB = Object.values([rows, fields][0][0]).filter((userDB) => userDB);
        const match = await matchHash.validatePassword(password, userDB[2]);
        
        if(!match) {
            throw new Error("Error O Password Incorrect!").message;            
        } 

        const token = jwt.createToken(userDB[0]);
        return token;
    }
}
