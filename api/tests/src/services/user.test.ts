// Dependencies
import { faker } from '@faker-js/faker';

// Utils
import UserService from '../../../src/services/user.service';

// Types
import { CreateUser } from '../../../src/types';

describe('user services', () => {
  let userServices: UserService;

  const userCreate: CreateUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName(),
  };

  beforeAll(() => {
    userServices = new UserService();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should create user and return nothing', async () => {
    userServices.create = jest.fn().mockResolvedValue(null);

    const res = await userServices.create(userCreate);

    expect(res).toBeNull();
  });

  it('should return error when there is no user', async () => {
    userServices.create = jest
      .fn()
      .mockReturnValue(new Error('Empty user date'));

    try {
      await userServices.create(userCreate);
    } catch (error: any) {
      expect(error.message).toBe('Empty user date');
    }
  });

  it('should return nothing when email is valid', async () => {
    userServices.emailValidation = jest.fn().mockResolvedValue(null);

    const res = await userServices.emailValidation(userCreate.email);

    expect(res).toBeNull();
  });

  it('should return error when email is already used', async () => {
    userServices.emailValidation = jest
      .fn()
      .mockReturnValue(new Error('User alredy exists'));

    const res = await userServices.emailValidation(userCreate.email);

    expect(res?.message).toBe('User alredy exists');
  });

  it('should return user when for step or id', async () => {
    userServices.getUserById = jest.fn().mockReturnValue(userCreate);

    const res = await userServices.getUserById(1);

    expect(res).toBe(userCreate);
  });

  it('should return error when user is not hair id found', async () => {
    userServices.getUserById = jest
      .fn()
      .mockReturnValue(new Error('User not found'));

    try {
      await userServices.getUserById(2);
    } catch (error: any) {
      expect(error.message).toBe('User not found');
    }
  });
});
