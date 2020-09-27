import jwt from 'jsonwebtoken';

export class Jwt {
  public createToken(idUser: number): string {
    const token = jwt.sign({ id: idUser }, process.env.SECRET_KEY || 'token_para_desarrollo');
    return token;
  }
}