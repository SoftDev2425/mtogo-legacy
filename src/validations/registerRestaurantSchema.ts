import { z } from 'zod';

const registerRestaurantSchema = z.object({
  name: z.string().min(1, 'Please enter a valid restaurant name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  address: z.object({
    street: z.string().min(1, 'Please enter a valid street address'),
    city: z.string().min(1, 'Please enter a valid city'),
    zip: z
      .string()
      .min(4, 'Please enter a valid danish zip code')
      .max(4, 'Please enter a valid danish zip code'),
  }),
});

export { registerRestaurantSchema };
