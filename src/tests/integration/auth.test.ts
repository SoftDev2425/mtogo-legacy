import supertest from 'supertest';
import {
  createTestAdmin,
  createTestCustomer,
  testPassword,
} from '../../utils/helperMethods';
import { app } from '../setup/setup';
import { validate as uuidValidate } from 'uuid';

describe('customerLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login a customer', async () => {
    // Arrange
    const testCustomer = await createTestCustomer();

    // Act
    const response = await supertest(app)
      .post('/api/auth/login/customer')
      .send({ email: testCustomer.email, password: testPassword });

    // Assert
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toContain('session');

    //check if valid uuid
    const sessionToken = response.headers['set-cookie'][0]
      .split(';')[0]
      .split('=')[1];
    expect(uuidValidate(sessionToken)).toBe(true);
    expect(response.body.message).toBe('Login successful!');
  });

  it('should return 400 if email or password is missing', async () => {
    // Act
    const response = await supertest(app).post('/api/auth/login/customer');

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required');
  });

  it('should return 401 if credentials are invalid', async () => {
    // Act
    const response = await supertest(app)
      .post('/api/auth/login/customer')
      .send({ email: 'invalid@email.com', password: 'invalidPassword' });

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 400 if email is invalid', async () => {
    // Act
    const response = await supertest(app)
      .post('/api/auth/login/customer')
      .send({ email: 'invalidEmail', password: 'password' });

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.errors[0].field).toBe('email');
    expect(response.body.errors[0].message).toBe(
      'Please provide a valid email address.',
    );
  });

  it('should return 401 if password is invalid', async () => {
    // Act
    const testCustomer = await createTestCustomer();
    const response = await supertest(app)
      .post('/api/auth/login/customer')
      .send({ email: testCustomer.email, password: 'invalidPassword' });

    console.log(response.body);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});

describe('adminLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login an admin', async () => {
    // Arrange
    const admin = await createTestAdmin();

    // Act
    const response = await supertest(app)
      .post('/api/auth/login/management')
      .send({ email: admin.email, password: testPassword });

    // Assert
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();

    expect(response.headers['set-cookie'][0]).toContain('session');

    // // check if valid uuid
    const sessionToken = response.headers['set-cookie'][0]
      .split(';')[0]
      .split('=')[1];
    expect(uuidValidate(sessionToken)).toBe(true);
    expect(response.body.message).toBe('Login successful!');
  });
});
