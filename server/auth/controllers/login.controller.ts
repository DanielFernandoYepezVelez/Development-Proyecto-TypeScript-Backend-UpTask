import { Request, Response } from "express";
import { GoogleTokenVerify } from '../libs/google-auth.lib';

/* Services */
import { LoginService } from '../services/login.service';
import { ProjectService } from '../../projects/services/project.service';

/* Interfaces */
import { ILogin } from "../interfaces/login.interface.";

/* Instancias */
const loginService = new LoginService();
const projectService = new ProjectService();
const googleTokenVerify = new GoogleTokenVerify();

export class LoginController {
  public async login(req: Request, res: Response): Promise<Response<JSON>> {
    const user: ILogin = { ...req.body };

    try {
      const token: string = await loginService.login(user);
      return res.json({ ok: true, message: "User Logged In Successfully", token});
      
    } catch (e) {
      return res.status(400).json({ ok: false, error: e });
    }
  }

  public async loginGoogle(req: Request, res: Response): Promise<Response<JSON>> {
    const  { token } = req.body;

    try {
      const userGoogle = await googleTokenVerify.verify(token);      
      const tokenPropio = await loginService.loginGoogle(userGoogle);

      return res.json({ ok: true, message: "User Logged In Successfully", tokenPropio});

    } catch (e) {
      return res.status(400).json({ ok: false, message: 'Si error === {}; El Token No Es Válido', error: e });
    }
  }

  /* Aqui Estoy Validar Y Renovando El Token Que Voy Almacenar En El LocalStorage Desde El Frontend Y Comprobar Que Sea Válido */
  public async loginRenew(req: Request, res: Response): Promise<Response<JSON>> {
    const idUser = req.user;

    try {
      const tokenValidado: string = await loginService.loginRenew(idUser);
      const projects: object[] = await projectService.projects(idUser);

      return res.json({ ok: true, tokenValidado, projects});

    } catch (e) {
      return res.status(400).json({ ok: false, error: e});
    }
  }
}
