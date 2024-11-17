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

// Get categories by restaurant id: GET /restaurant/categories/:restaurantId
router.get(
  '/categories/:restaurantId',
  validateSession,
  requireRoles(['restaurant', 'customer']),
  restaurantController.handleGetCategoriesByRestaurantId,
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
router.post(
  '/categories/:categoryId/menus',
  validateSession,
  requireRestaurant,
  restaurantController.handleCreateMenu,
);

// Get menus by category: GET /restaurant/categories/:categoryId/menus
router.get(
  '/categories/:categoryId/menus',
  validateSession,
  requireRoles(['restaurant', 'customer']),
  restaurantController.handleGetMenusByCategory,
);

// Update Menu: PUT /restaurant/menus/:menuId
router.put(
  '/menus/:menuId',
  validateSession,
  requireRestaurant,
  restaurantController.handleUpdateMenu,
);

// Delete Menu: DELETE /restaurant/menus/:menuId
router.delete(
  '/menus/:menuId',
  validateSession,
  requireRestaurant,
  restaurantController.handleDeleteMenu,
);

// GET ALL CATEGORIES AND MENUS FOR RESTAURANT BY ID
router.get(
  '/categories-menus/:restaurantId',
  validateSession,
  requireRoles(['restaurant', 'customer']),
  restaurantController.handleGetAllCategoriesAndMenusByRestaurantId,
);

// Get menus by category: GET /restaurant/menus?category=categoryId
router.get('/menus', (req, res) => {
  const { category } = req.query;
  res.send(`Get menus by category: ${category}`);
});

// Get nearby restaurants by city and zip code: GET /restaurants/nearby?city=:city&zipCode=:zipCode
// router.get('/nearby', restaurantController.handleGetNearbyRestaurants);

// Get Restaurant Details: GET /restaurants/:restaurantId
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  res.send(`Get Restaurant Details: ${restaurantId}`);
});

// Get All Categories of a Restaurant: GET /restaurants/:restaurantId/categories
router.get('/:restaurantId/categories', (req, res) => {
  const { restaurantId } = req.params;
  res.send(`Get All Categories of a Restaurant: ${restaurantId}`);
});

// Get All Menus of a Restaurant: GET /restaurants/:restaurantId/menus
router.get('/:restaurantId/menus', (req, res) => {
  const { restaurantId } = req.params;
  res.send(`Get All Menus of a Restaurant: ${restaurantId}`);
});

// Get Menu Details: GET /restaurants/:restaurantId/menus/:menuId
router.get('/:restaurantId/menus/:menuId', (req, res) => {
  const { restaurantId, menuId } = req.params;
  res.send(`Get Menu Details: ${restaurantId}, ${menuId}`);
});

export default router;
