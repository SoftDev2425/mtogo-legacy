import { z } from 'zod';

const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, 'Please enter a valid title')
    .max(55, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Please enter a valid description')
    .max(255, 'Description is too long')
    .optional(),
});

export { createCategorySchema };