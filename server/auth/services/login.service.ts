import { Mysql2 } from '../../libs/mysql2';

/* Instanciando Conexión De La Base De Datos */
const connection = new Mysql2();

export class LoginService {
    public async login(): Promise<any> {
        const [rows] = await connection.pool?.query('SELECT * FROM users');
        console.log([rows][0]);


        // console.log(rows[0]);
        // return [rows, fields][0];
    }


}