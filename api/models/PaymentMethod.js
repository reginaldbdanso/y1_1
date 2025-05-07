const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['credit_card', 'paypal', 'apple_pay', 'google_pay'],
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  details: {
    cardNumber: {
      type: String,
      // Only store last 4 digits for security
      validate: {
        validator: function(v) {
          return this.type !== 'credit_card' || (v && v.length >= 4);
        },
        message: 'Card number is required for credit cards'
      }
    },
    cardHolder: {
      type: String,
      validate: {
        validator: function(v) {
          return this.type !== 'credit_card' || (v && v.length > 0);
        },
        message: 'Card holder name is required for credit cards'
      }
    },
    expiryDate: {
      type: String,
      validate: {
        validator: function(v) {
          return this.type !== 'credit_card' || (v && v.length > 0);
        },
        message: 'Expiry date is required for credit cards'
      }
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return this.type !== 'paypal' || (v && v.length > 0);
        },
        message: 'Email is required for PayPal'
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;