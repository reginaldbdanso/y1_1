const mongoose = require('mongoose');

const shippingDetailsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  addresses: [{
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    stateProvince: String,
    district: String,
    country: String,
    phoneNumber: String,
    isDefault: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Remove password-related methods as they're not needed for shipping details
const ShippingDetails = mongoose.model('ShippingDetails', shippingDetailsSchema);

module.exports = ShippingDetails;