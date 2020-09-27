import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export class PassportJwt {
  private options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'token_para_desarrollo',
  };

  public newStrategia(): Strategy {
    return new Strategy(this.options, (payloadFromJwt, done) => {
      const idUser = payloadFromJwt.id;

      if (idUser) {
        return done(null, idUser);
      } else {
        return done(null, false);
      }
    });
  }
}