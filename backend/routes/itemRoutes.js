const express = require('express');
const router = express.Router();
const {
  reportLostItem,
  reportFoundItem,
  getAllItems,
} = require('../controllers/itemController');
const protect = require('../middleware/authMiddleware');

// @route POST /api/items/report-lost
router.post('/report-lost', protect, reportLostItem);

// @route POST /api/items/report-found
router.post('/report-found', protect, reportFoundItem);

// @route GET /api/items
router.get('/', protect, getAllItems); // Optional: you can make this admin-only later

module.exports = router;
