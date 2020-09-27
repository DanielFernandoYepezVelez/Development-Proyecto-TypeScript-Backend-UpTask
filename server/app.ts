/* Enviroment Vairables */
import "dotenv/config";

import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import express, { Application } from "express";

/* Modules Routes */
import { AuthRoutes } from "./auth/auth.routes";

/* Authenticate */
import { PassportJwt } from './auth/libs/passport-jwt';
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
    this.app.use("/api", AuthRoutes.login);
    this.app.use("/api", AuthRoutes.register);
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
