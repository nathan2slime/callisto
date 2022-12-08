// Dependencies
import { Request, Response } from 'express';
import { compare } from 'bcrypt';

// Types
import { CreateUser, LoginUser, User } from '../types';

// Utils
import { createAuthToken } from '../utils/token';
import UserService from '../services/user.service';
import log from '../log';

class UserController {
  userServices: UserService;

  constructor() {
    this.userServices = new UserService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginUser;

    log.info(req.body);

    try {
      const user: User = (await this.userServices.getUserByEmail(email)) as any;

      if (!(await compare(password, `${user?.password}`))) {
        return res.json({
          error: true,
          message: 'Invalid password',
        });
      }

      user.password = undefined;

      log.success('user logged', user);

      return res.json({ user, token: createAuthToken({ id: user?.id }) });
    } catch (error: any) {
      log.error(error.message);

      return res.json({
        error: true,
        message: error.message,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    const { email, name, password } = req.body as CreateUser;

    try {
      await this.userServices.create({
        email: email.trim(),
        name,
        password,
      });

      const user: User = await this.userServices.getUserByEmail(email);

      user.password = undefined;

      return res.json({ user, token: createAuthToken({ id: user?.id }) });
    } catch (error: any) {
      log.error(error.message);

      return res.json({
        error: true,
        message: error.message,
      });
    }
  };
}

export default UserController;
