import prisma from '../../prisma/client';
import { Prisma } from '@prisma/client';

async function createCategory(
  title: string,
  description: string,
  restaurantId: string,
) {
  try {
    // calculate sortOrder
    const categories = await prisma.categories.findMany({
      where: {
        restaurantId,
      },
      orderBy: {
        sortOrder: 'desc',
      },
    });

    const sortOrder = categories.length > 0 ? categories[0].sortOrder + 1 : 0;

    return await prisma.categories.create({
      data: {
        title,
        description,
        sortOrder: sortOrder,
        restaurant: {
          connect: {
            id: restaurantId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        sortOrder: true,
        description: true,
        createdAt: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        (error.meta?.target as string[])?.includes('title')
      ) {
        throw new Error('A category with this title already exists');
      }
    }
    throw error;
  }
}

async function getAllCategories() {
  return await prisma.categories.findMany();
}

async function updateCategory(
  categoryId: string,
  title: string,
  description: string,
  sortOrder: number,
  restaurantId: string,
) {
  try {
    // validate sortOrder
    const category = await prisma.categories.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    if (category.restaurantId !== restaurantId) {
      throw new Error('Category not found');
    }

    if (sortOrder !== category.sortOrder) {
      const categories = await prisma.categories.findMany({
        where: {
          restaurantId,
        },
        orderBy: {
          sortOrder: 'desc',
        },
      });

      if (sortOrder < 0 || sortOrder > categories.length - 1) {
        throw new Error('Invalid sortOrder');
      }
    }

    return await prisma.categories.update({
      where: {
        id: categoryId,
      },
      data: {
        title,
        description,
        sortOrder,
      },
      select: {
        id: true,
        title: true,
        description: true,
        sortOrder: true,
        createdAt: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        (error.meta?.target as string[])?.includes('title')
      ) {
        throw new Error('A category with this title already exists');
      }
    }
    throw error;
  }
}

async function deleteCategory(categoryId: string, restaurantId: string) {
  const category = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category || category.restaurantId !== restaurantId) {
    throw new Error('Category not found');
  }

  await prisma.categories.delete({
    where: {
      id: categoryId,
    },
  });
}

export { createCategory, getAllCategories, updateCategory, deleteCategory };
