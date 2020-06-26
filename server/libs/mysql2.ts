import dotenv from 'dotenv';
dotenv.config();

import { createConnection, Connection } from 'mysql2/promise';

/* EL Mejor Manejo De Error Hasta El Momento(MEJORARLO) */
class Mysql2 {
  objectConn: any;

  async databaseConn(): Promise<Connection> {
    try {
      this.objectConn = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      if (this.objectConn) {
        console.log('>>> DB IS CONNECTED');
      }

      return this.objectConn;
    } catch (e) {
      console.log('>>> DB IS NOT CONNECTED');
      return e;
    }
  }
}

const mysql2 = new Mysql2();
export default mysql2.databaseConn();
