export interface IRegister {
  name: string;
  email: string;
  password: string;
  id?: number;
  img?: string;
  role?: string;
  state?: number;
  google?: number;
  created_at?: Date;
  repeat_password?: string;
}