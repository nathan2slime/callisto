// Dependencies
import { NextFunction, Response, Request } from 'express';
import { hash } from 'bcrypt';

// Utils
import UserService from '../services/user.service';
import { decodedAuthToken } from '../utils/token';
import envs from '../../env';
import log from '../log';

// Type
import { CreateUser } from '../types';

class UserMiddleware {
  public userServices: UserService;

  constructor() {
    this.userServices = new UserService();
  }

  isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      const { id } = decodedAuthToken(token) as any;

      const user = await this.userServices.getUserById(id);

      if (user.admin == 'true') {
        return next();
      }

      throw new Error();
    } catch (error: any) {
      return res.json({
        error: true,
        message: 'Not authorized',
      });
    }
  };

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as CreateUser;

    const err = await this.userServices.emailValidation(user.email);

    if (err)
      return res.json({
        error: true,
        message: err.message,
      });

    user.password = await hash(
      user.password,
      parseInt(envs.PASSWORD_HASH_SALT)
    );

    log.complete('validated email', { email: user.email });

    next();
  };
}

export default UserMiddleware;
