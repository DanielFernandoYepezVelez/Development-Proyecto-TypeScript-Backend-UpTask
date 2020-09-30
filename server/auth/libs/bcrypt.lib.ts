import { genSalt, hash, compare } from 'bcrypt';

export class UserPassword {
  public async encryptPassword(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    const result: string = await hash(password, salt);
    return result;
  }

  public async validatePassword(userPassword: string, databasePassword: string): Promise<boolean> {
    const matchPassword = await compare(userPassword, databasePassword);
    return matchPassword;
  }
}