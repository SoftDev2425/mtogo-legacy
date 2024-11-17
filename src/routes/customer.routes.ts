import express from 'express';

const router = express.Router();

// Get All Nearby Restaurants: GET /restaurants/nearby?latitude=:lat&longitude=:lng
router.get('/nearby', (req, res) => {
  const { latitude, longitude } = req.query;
  res.send(`Get All Nearby Restaurants: ${latitude}, ${longitude}`);
});

// Get nearby restaurants by city and zip code: GET /restaurants/nearby?city=:city&zipCode=:zipCode
router.get('/nearby', (req, res) => {
  const { city, zipCode } = req.query;
  res.send(`Get nearby restaurants by city and zip code: ${city}, ${zipCode}`);
});

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
