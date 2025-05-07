const ShippingDetails = require('../models/ShippingDetails');
const { NotFoundError, InternalServerError } = require('../errors');

const shippingController = {
  getAddresses: async (req, res, next) => {
    try {
      let userShipping = await ShippingDetails.findOne({ user_id: req.user.id });
      
      if (!userShipping) {
        userShipping = await ShippingDetails.create({
          user_id: req.user.id,
          addresses: []
        });
      }

      res.json({ addresses: userShipping.addresses });
    } catch (error) {
      next(new InternalServerError('Error fetching shipping addresses'));
    }
  },

  addAddress: async (req, res, next) => {
    try {
      const { firstName, lastName, email, addressLine1, addressLine2, city, stateProvince, district, country, phoneNumber, isDefault } = req.body;
      let userShipping = await ShippingDetails.findOne({ user_id: req.user.id });
      
      if (!userShipping) {
        userShipping = await ShippingDetails.create({
          user_id: req.user.id,
          addresses: []
        });
      }
      
      if (isDefault || userShipping.addresses.length === 0) {
        userShipping.addresses.forEach(addr => addr.isDefault = false);
      }
      
      const newAddress = {
        firstName,
        email,
        lastName,
        addressLine1,
        addressLine2,
        city,
        stateProvince,
        district,
        country,
        phoneNumber,
        isDefault: isDefault || userShipping.addresses.length === 0
      };
      
      userShipping.addresses.push(newAddress);
      await userShipping.save();

      res.status(201).json(newAddress);
    } catch (error) {
      next(new InternalServerError('Error adding shipping address'));
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const userShipping = await ShippingDetails.findOne({ user_id: req.user.id });
      
      if (!userShipping) {
        return next(new NotFoundError('Shipping details not found'));
      }

      const addressIndex = userShipping.addresses.findIndex(addr => addr._id.toString() === id);
      
      if (addressIndex === -1) {
        return next(new NotFoundError('Address not found'));
      }

      if (updateData.isDefault) {
        userShipping.addresses.forEach(addr => addr.isDefault = false);
      }

      Object.assign(userShipping.addresses[addressIndex], updateData);
      await userShipping.save();

      res.json(userShipping.addresses[addressIndex]);
    } catch (error) {
      next(new InternalServerError('Error updating shipping address'));
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const userShipping = await ShippingDetails.findOne({ user_id: req.user.id });
      
      if (!userShipping) {
        return next(new NotFoundError('Shipping details not found'));
      }

      const addressIndex = userShipping.addresses.findIndex(addr => addr._id.toString() === id);
      
      if (addressIndex === -1) {
        return next(new NotFoundError('Address not found'));
      }

      userShipping.addresses.splice(addressIndex, 1);
      await userShipping.save();

      res.status(204).send();
    } catch (error) {
      next(new InternalServerError('Error deleting shipping address'));
    }
  }
};

module.exports = shippingController;