import { CustomRequest } from '../types/CustomRequest';
import { loginSchema } from '../validations/loginSchema';
import { Response } from 'express';
import { ZodError } from 'zod';
import { registerCustomerSchema } from '../validations/registerCustomerSchema';
import { validateRequiredFields } from '../utils/validateRequiredFields';
import {
  registerCustomer,
  registerRestaurant,
  customerLogin,
  restaurantLogin,
  managementLogin,
} from '../services/auth.service';
import { registerRestaurantSchema } from '../validations/registerRestaurantSchema';

async function handleRegisterCustomer(req: CustomRequest, res: Response) {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const requiredFields = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'password',
    ];
    const errors = validateRequiredFields(req.body, requiredFields);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    registerCustomerSchema.parse({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    const customer = await registerCustomer(
      firstName,
      lastName,
      phone,
      email,
      password,
    );

    return res.status(200).json({
      message: 'Customer registered successfully',
      customer: {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        createdAt: customer.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    } else if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleRegisterRestaurant(req: CustomRequest, res: Response) {
  try {
    const { name, email, phone, password, address } = req.body;

    const requiredFields = ['name', 'email', 'phone', 'password', 'address'];
    const errors = validateRequiredFields(req.body, requiredFields);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    registerRestaurantSchema.parse({
      name,
      email,
      phone,
      password,
      address,
    });

    const restaurant = await registerRestaurant(
      name,
      email,
      phone,
      password,
      address,
    );

    return res.status(200).json({
      message: 'Restaurant registered successfully',
      customer: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone,
        address: restaurant.address,
        createdAt: restaurant.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    } else if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleCustomerLogin(req: CustomRequest, res: Response) {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    loginSchema.parse({ email, password });

    const { sessionToken, sessionTokenExpiry } = await customerLogin(
      email,
      password,
      rememberMe,
    );

    // Return the token to the customer via a cookie
    res.cookie(`session`, sessionToken, {
      maxAge: sessionTokenExpiry * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    // type guard to narrow the type of `error`
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    } else if (error instanceof Error) {
      // Handle general errors with a clear error message
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function handleRestaurantLogin(req: CustomRequest, res: Response) {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    loginSchema.parse({ email, password });

    const { sessionToken, sessionTokenExpiry } = await restaurantLogin(
      email,
      password,
      rememberMe,
    );

    // Return the token to the customer via a cookie
    res.cookie(`session`, sessionToken, {
      maxAge: sessionTokenExpiry * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    // type guard to narrow the type of `error`
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    } else if (error instanceof Error) {
      // Handle general errors with a clear error message
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function handleManagementLogin(req: CustomRequest, res: Response) {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    loginSchema.parse({ email, password });

    const { sessionToken, sessionTokenExpiry } = await managementLogin(
      email,
      password,
      rememberMe,
    );

    // Return the token to the customer via a cookie
    res.cookie(`session`, sessionToken, {
      maxAge: sessionTokenExpiry * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    // type guard to narrow the type of `error`
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    } else if (error instanceof Error) {
      // Handle general errors with a clear error message
      return res.status(401).json({ message: error.message });
    }

    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function handleLogout(_req: Request, res: Response) {
  try {
    res.setHeader('set-Cookie', `session=deleted; expires=${new Date(0)}`);
  } catch (error) {
    console.error(error);
  }
}

export default {
  handleCustomerLogin,
  handleRestaurantLogin,
  handleManagementLogin,
  handleLogout,
  handleRegisterCustomer,
  handleRegisterRestaurant,
};
