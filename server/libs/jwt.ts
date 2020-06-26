import jwt from 'jsonwebtoken';

export class Jwt {
  createToken(idUser: number) {
    const token = jwt.sign(
      { id: idUser },
      process.env.SECRET_KEY || 'token_para_desarrollo'
    );

    return token;
  }
}
