/* Sub-Routes */
import { LoginRoute } from './routes/login.routes';
import { RegisterRoute } from './routes/register.routes';

/* Instanciando Sub-Routes */
const loginRoute = new LoginRoute();
const registerRoute = new RegisterRoute();

export class AuthRoutes {
  public static login = loginRoute.router; 
  public static register = registerRoute.router;
}