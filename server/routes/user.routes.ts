import { Router } from 'express';

import { userController } from '../controllers/user.controller';

class UserRoutes {
  constructor(public router: Router) {
    this.router.post('/signup', userController.signup);
    this.router.post('/signin', userController.signin);
  }
}

const userRoutes = new UserRoutes(Router());
export default userRoutes.router;
