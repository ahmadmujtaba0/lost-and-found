const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  itemName: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  contactInfo: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
