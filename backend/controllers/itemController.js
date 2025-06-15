const Item = require('../models/Item');

// @desc Report a lost item
// @route POST /api/items/report-lost
// @access Private
const reportLostItem = async (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const item = new Item({
      title,
      description,
      location,
      status: 'lost',
      user: req.user.id, // Set by authMiddleware
    });

    await item.save();
    res.status(201).json({ message: 'Lost item reported successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error while reporting lost item' });
  }
};

// @desc Report a found item
// @route POST /api/items/report-found
// @access Private
const reportFoundItem = async (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const item = new Item({
      title,
      description,
      location,
      status: 'found',
      user: req.user.id, // Set by authMiddleware
    });

    await item.save();
    res.status(201).json({ message: 'Found item reported successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error while reporting found item' });
  }
};

// Optional: Get all items (for admin)
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

module.exports = {
  reportLostItem,
  reportFoundItem,
  getAllItems,
};
