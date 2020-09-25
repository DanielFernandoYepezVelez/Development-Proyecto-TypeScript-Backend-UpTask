import { genSalt, hash, compare } from 'bcrypt';

class UserPassword {
  async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const result = await hash(password, salt);

    return result;
  }

  async validatePassword(
    userPassword: string,
    databasePassword: string
  ): Promise<boolean> {
    const matchPassword = await compare(userPassword, databasePassword);

    return matchPassword;
  }
}

export const userPassword = new UserPassword();
