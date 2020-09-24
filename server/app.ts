/* Enviroment Vairables */
import "dotenv/config";

/* Libraries */
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import express, { Application } from "express";

/* Routes */
import taskRouter from "./routes/task.routes";
import userRouter from "./routes/user.routes";
import projectRouter from "./routes/project.routes";

/* Authenticate */
import { passportJwt } from "./libs/passport-jwt";

class App {
  /* Initializations */
  constructor(private app: Application) {}

  /* Middlewares */
  public middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    passport.use(passportJwt.nuevaStrategia());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /* Routes */
  public routes(): void {
    this.app.use("/api", taskRouter);
    this.app.use("/api", userRouter);
    this.app.use("/api", projectRouter);
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

export const app = new App(express());
