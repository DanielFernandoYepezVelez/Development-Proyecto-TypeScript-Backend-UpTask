export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  state?: number;
  created_at?: Date;
}
