// Dependencies
import supertest from 'supertest';

// Utils
import app from '../src';

const test = supertest(app);

describe('app health check', () => {
  it('should return app info', async () => {
    const data = {
      name: 'Cars',
      version: 1.0,
    };

    const res = await test.get('/');

    expect(res.body).toStrictEqual(data);
  });
});
