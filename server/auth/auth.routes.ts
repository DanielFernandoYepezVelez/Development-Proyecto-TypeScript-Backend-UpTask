/* Sub-Routes */
import { RegisterRoute } from "./routes/register.routes";
import { LoginRoute } from './routes/login.routes';

export class AuthRoutes {
  public static register = new RegisterRoute().router;
  public static login = new LoginRoute().router; 
}
