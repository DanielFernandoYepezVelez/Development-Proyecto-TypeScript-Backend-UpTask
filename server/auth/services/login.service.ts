import { Jwt } from '../libs/jwt.lib';
import pool from "../../libs/mysql2";
import { UserPassword } from "../libs/bcrypt.lib";

/* Interfaces */
import { ILogin } from "../interfaces/login.interface.";
import { IRegister } from '../interfaces/register.interface';

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
        const [rows, fields]: object[][] = await pool.query("SELECT id, email, password FROM users WHERE email = ?", [email]);

        if (![rows, fields][0][0]) {
            throw new Error("Usuario No Existe!").message;
        }

        const userDB = Object.values([rows, fields][0][0]).filter(userDB => userDB);
        const match = await matchHash.validatePassword(password, userDB[2]);
        
        if(!match) {
            throw new Error("Email O Contraseña Incorrecta!").message;            
        } 

        const token = jwt.createToken(userDB[0]);
        return token;
    }

    public async loginGoogle(userGoogle: any) {
        const { email, name, picture } = userGoogle;
        const userGoogleFinally: IRegister = { name, email, password: '@%@', img: picture, state: 1, google: 1 };

        let [rows, fields]: object[][] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
                
        if(![rows, fields][0][0]) {
            await pool.query("INSERT INTO users SET ?", [userGoogleFinally]);           
        } else {
            /* Si Existe El Usuario Viene De Una Autenticación Con Email Y Password Normal */
            await pool.query("UPDATE users SET ? WHERE email = ? ", [userGoogleFinally, email]);
        }
        
        /* Aqui Genero Mi Propio JWT Firmado Por Mi Backend Con Su Respectivo ID Y Se Lo Devuelvo Al Frontend */
        /* La Condición Se Cumple Solo Por Si No Existe El Usuario En La Base De Datos, Para Que No Se Evalue Un Undefined */
        if(![rows, fields][0][0]) {
            [rows, fields] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        }

        const userId = Object.values([rows, fields][0][0]).find(user => user);
        const tokenPropio = jwt.createToken(userId);

        return tokenPropio;
    }

    public async loginRenew(idUser: any): Promise<string> {
        const tokenValidado: string = jwt.createToken(idUser);
        return tokenValidado;
    }
}