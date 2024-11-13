import prisma from '../../../prisma/client';
import { registerCustomer } from '../../services/auth.service';
import bcrypt from 'bcrypt';

describe('registerCustomer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully register a customer with hashed password', async () => {
    // Arrange
    const mockCustomer = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mocking bcrypt.hash to return the same password
    bcrypt.hash = jest.fn().mockResolvedValue(mockCustomer.password);

    prisma.customers.create = jest.fn().mockResolvedValue(mockCustomer);

    // Act
    const result = await registerCustomer(
      mockCustomer.firstName,
      mockCustomer.lastName,
      mockCustomer.phone,
      mockCustomer.email,
      'notHashedPassword',
    );

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith('notHashedPassword', 10);
    expect(prisma.customers.create).toHaveBeenCalledTimes(1);
    expect(prisma.customers.create).toHaveBeenCalledWith({
      data: {
        firstName: mockCustomer.firstName,
        lastName: mockCustomer.lastName,
        phone: mockCustomer.phone,
        email: mockCustomer.email,
        password: mockCustomer.password,
      },
    });
    expect(result).toEqual(mockCustomer);
  });

  it('should throw an error if a customer with the same email already exists', async () => {
    // Arrange
    const mockError = new Error('A customer with this email already exists');
    mockError.name = 'PrismaClientKnownRequestError';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockError as any).code = 'P2002';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockError as any).meta = { target: ['email'] };

    // Mock prisma.customers.create to throw a Prisma error
    prisma.customers.create = jest.fn().mockRejectedValueOnce(mockError);

    // Act & Assert
    await expect(
      registerCustomer(
        'John',
        'Doe',
        '1234567890',
        'john.doe@example.com',
        'notHashedPassword',
      ),
    ).rejects.toThrow('A customer with this email already exists');
  });

  it('should throw an error if an unexpected error occurs', async () => {
    // Arrange
    const mockError = new Error('Something went wrong');

    // Mock prisma.customers.create to throw an unexpected error
    prisma.customers.create = jest.fn().mockRejectedValueOnce(mockError);

    // Act & Assert
    await expect(
      registerCustomer(
        'John',
        'Doe',
        '1234567890',
        'john.doe@example.com',
        'notHashedPassword',
      ),
    ).rejects.toThrow('Something went wrong');

    // Assert
    expect(prisma.customers.create).toHaveBeenCalledTimes(1);
  });
});

describe('customerLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login a customer', async () => {
    // Arrange

    // Act

    // Assert


  });
});
