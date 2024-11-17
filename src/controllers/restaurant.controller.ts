import { Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';
import { createCategorySchema } from '../validations/createCategoryScema';
import { ZodError } from 'zod';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../services/restaurant.service';

async function handleCreateCategory(req: CustomRequest, res: Response) {
  try {
    const { title, description } = req.body;

    createCategorySchema.parse({
      title,
      description,
    });

    const category = await createCategory(
      title,
      description,
      req.userId as string,
    );

    return res.status(200).json({
      message: 'Category created successfully',
      category: {
        id: category.id,
        title: category.title,
        sortOrder: category.sortOrder,
        description: category.description,
        createdAt: category.createdAt,
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

async function handleGetAllCategories(_req: CustomRequest, res: Response) {
  try {
    const categories = await getAllCategories();

    const formattedCategories = categories
      .map(category => ({
        id: category.id,
        title: category.title,
        description: category.description,
        sortOrder: category.sortOrder,
        createdAt: category.createdAt,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return res.status(200).json({
      categories: formattedCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleUpdateCategory(req: CustomRequest, res: Response) {
  try {
    const { categoryId } = req.params;
    const { title, description, sortOrder } = req.body;

    createCategorySchema.parse({
      title,
      description,
      sortOrder,
    });

    const category = await updateCategory(
      categoryId,
      title,
      description,
      sortOrder,
      req.userId as string,
    );

    return res.status(200).json({
      message: 'Category updated successfully',
      category: {
        id: category.id,
        title: category.title,
        description: category.description,
        sortOrder: category.sortOrder,
        createdAt: category.createdAt,
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

async function handleDeleteCategory(req: CustomRequest, res: Response) {
  try {
    await deleteCategory(req.params.categoryId, req.userId as string);

    return res.status(200).json({
      message: `Category ${req.params.categoryId} deleted successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default {
  handleCreateCategory,
  handleGetAllCategories,
  handleUpdateCategory,
  handleDeleteCategory,
};
