import restaurantController from '../controllers/restaurant.controller';
import { requireRestaurant, requireRoles } from '../middlewares/role';
import { validateSession } from '../middlewares/sessions';
import express from 'express';

const router = express.Router();

// Create Category: POST /restaurant/categories
router.post(
  '/categories',
  validateSession,
  requireRestaurant,
  restaurantController.handleCreateCategory,
);

// Get All Categories: GET /restaurant/categories
router.get(
  '/categories',
  validateSession,
  requireRoles(['restaurant', 'customer']),
  restaurantController.handleGetAllCategories,
);

// Update Category: PUT /restaurant/categories/:categoryId
router.put(
  '/categories/:categoryId',
  validateSession,
  requireRestaurant,
  restaurantController.handleUpdateCategory,
);

// Delete Category: DELETE /restaurant/categories/:categoryId
router.delete(
  '/categories/:categoryId',
  validateSession,
  requireRestaurant,
  restaurantController.handleDeleteCategory,
);

// Create Menu: POST /restaurant/categories/:categoryId/menus
router.post('/categories/:categoryId/menus', (req, res) => {
  const { categoryId } = req.params;

  res.send(`Create Menu on category: ${categoryId}`);
});

// Get All Menus: GET /restaurant/menus
router.get('/menus', (_req, res) => {
  res.send('Get All Menus');
});

// Get menus by category: GET /restaurant/menus?category=categoryId
router.get('/menus', (req, res) => {
  const { category } = req.query;
  res.send(`Get menus by category: ${category}`);
});

// Update Menu: PUT /restaurant/menus/:menuId
router.put('/menus/:menuId', (_req, res) => {
  res.send('Update Menu');
});

// Delete Menu: DELETE /restaurant/menus/:menuId
router.delete('/menus/:menuId', (_req, res) => {
  res.send('Delete Menu');
});

export default router;
