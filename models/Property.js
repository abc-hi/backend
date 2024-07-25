import mongoose from 'mongoose';


const PropertySchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'Not Sold',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Property', PropertySchema);
