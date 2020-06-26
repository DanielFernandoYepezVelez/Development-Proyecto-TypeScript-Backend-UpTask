import express, { Application } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

import projectRouter from './routes/project.routes';
import taskRouter from './routes/task.routes';
import userRouter from './routes/user.routes';

import { passportJwt } from './libs/passport-jwt';

class App {
  constructor(private app: Application) {}

  public settings(): void {
    this.app.set('port', process.env.PORT || 3001);
  }

  public middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    passport.use(passportJwt.nuevaStrategia());
  }

  public routes(): void {
    this.app.use('/api', projectRouter);
    this.app.use('/api', taskRouter);
    this.app.use('/api', userRouter);
  }

  public async server(): Promise<void> {
    try {
      const port = await this.app.listen(this.app.get('port'));

      if (port) console.log(`Server On Port ${this.app.get('port')}`);
      else console.log(`Port No Exist!`);
    } catch {
      console.log(`You Can't Connect The Server`);
    }
  }
}

export const app = new App(express());
