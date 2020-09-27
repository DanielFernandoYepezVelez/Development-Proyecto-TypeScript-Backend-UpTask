import { createPool } from "mysql2/promise";

class Mysql2 {
  public pool: any;

  constructor() {
    try {
      this.pool = createPool({
        host: process.env.HOST_DATABASE,
        user: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        database: process.env.NAME_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      if (this.pool) {
        console.log(">>> Database Is Connected");
      }
    } catch (e) {
      console.log(">>> Database Is NOT Connected", e);
    }
  }
}

export default new Mysql2().pool;