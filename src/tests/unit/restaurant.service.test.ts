import prisma from '../../../prisma/client';

describe('Restaurant Category Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a category', async () => {
    // Unit Test for createCategory
    // Arrange
    const mockCategory = {
      id: '1',
      title: 'Burgers',
      sortOrder: 0,
      description: 'Delicious burgers',
      createdAt: new Date(),
    };

    prisma.categories.create = jest.fn().mockResolvedValue(mockCategory);

    // Act

    // Assert
  });

  it('should throw an error if a category with the same title already exists', async () => {});

  it('should update a category', async () => {});

  it('should throw an error if the category does not exist', async () => {});

  it('should delete a category', async () => {});

  it('should throw an error if the category does not exist', async () => {});

  it('should create a menu', async () => {});

  it('should throw an error if the category does not exist', async () => {});

  it('should update a menu', async () => {});

  it('should throw an error if the menu does not exist', async () => {});

  it('should delete a menu', async () => {});

  it('should throw an error if the menu does not exist', async () => {});

  it('should get all menus', async () => {});

  it('should get menus by category', async () => {});

  it('should get all categories', async () => {});

  it('should get category by id', async () => {});

  it('should throw an error if the category does not exist', async () => {});
});
