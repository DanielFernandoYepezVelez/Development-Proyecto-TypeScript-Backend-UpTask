export interface IUserSignUp {
  id?: string;
  name: string;
  email: string;
  password: string;
  state?: number;
  created_at?: Date;
}

export interface IUserSignIn {
  id?: string;
  name?: string;
  email: string;
  password: string;
  state?: number;
  created_at?: Date;
}
