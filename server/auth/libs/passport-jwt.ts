import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import pool from '../../libs/mysql2';

class PassportJwt {
  private options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'token_para_desarrollo',
  };

  public nuevaStrategia() {
    return new Strategy(
      this.options,
      async (payloadFromJwt, done): Promise<any> => {
        /* Hago Una Consulta A La DB Por El Id Del Usuario Que Tengo En El Token, Que Guarde Anteriormente Al Momento De Crearlo En Su Respectivo Payload */

        /* const conn = await pool;
        const query = await conn.query('SELECT * FROM users WHERE id = ?', [
          payloadFromJwt.id,
        ]); Esta Consulta Es Valida Pero No es conveniente por el problema que tengo que convertir la consulta a un string*/

        const idUser = payloadFromJwt.id;

        if (idUser) {
          return done(null, idUser);
        }

        return done(null, false);
      }
    );
  }
}

export const passportJwt = new PassportJwt();
