
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/db');

const verifyAdmin = require('./middleware/verifyAdmin');
const User = require('./models/userModel');
const Item = require('./models/itemModel');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// (signup)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Optionally create a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'mysecretkey', {
      expiresIn: '1d'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// (login)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'mysecretkey', {
      expiresIn: '1d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// (lost or found Item)
app.post('/api/items/report', async (req, res) => {
  console.log('Request body:', req.body); 
  try {
    const { type, itemName, description, location, date, contactInfo, userId } = req.body;

    if (!type || !itemName || !location || !date || !contactInfo || !userId) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newItem = new Item({
      type, // 'lost' or 'found'
      itemName,
      description,
      location,
      date,
      contactInfo,
      userId
    });

    await newItem.save();

    res.status(201).json({
      message: 'Item reported successfully',
      item: newItem
    });
  } catch (err) {
    console.error('Report item error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get users for ADMIN
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    console.error('Admin get users error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get items for ADMIN
app.get('/api/admin/items', async (req, res) => {
  try {
    const items = await Item.find().populate('userId', 'name email');
    res.json(items);
  } catch (err) {
    console.error('Admin get items error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
