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

export { createCategory };
