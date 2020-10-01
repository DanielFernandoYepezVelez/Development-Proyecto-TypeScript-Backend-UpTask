/* Enviroment Vairables */
import "dotenv/config";

import path from 'path';
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import express, { Application } from "express";

/* Modules Routes */
import { AuthRoutes } from "./auth/auth.module.routes";
import { TaskRoutes } from './tasks/task.module.routes';
import { ProjectRoutes } from './projects/project.module.routes';

/* Authenticate */
import { PassportJwt } from './auth/middlewares/passport.middleware';
const passportJwt = new PassportJwt();

export class App {
  /* Initializations */
  private app: Application = express();

  /* Middlewares */
  public middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    passport.use(passportJwt.newStrategia());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /* Routes */
  public routes(): void {
    this.app.use("/api", TaskRoutes.task);
    this.app.use("/api", AuthRoutes.login);
    this.app.use("/api", AuthRoutes.register);
    this.app.use("/api", ProjectRoutes.project);
  }

  /* Static Files */
  public staticFiles() {
    this.app.use(express.static(path.join(__dirname, './public/')));
  }

  /* Server Running */
  public async server(): Promise<void> {
    try {
      await this.app.listen(process.env.PORT);
      console.log(`Server On Port ${process.env.PORT}`);
    } catch (e) {
      console.log(`You Can't Connect The Server`);
      console.log(e);
    }
  }
}
