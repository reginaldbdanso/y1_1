const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { username, firstName, lastName, email } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields if provided
    if (username) user.username = username;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    
    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user addresses
const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('addresses');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.addresses || []);
  } catch (error) {
    console.error('Get user addresses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add user address
const addUserAddress = async (req, res) => {
  try {
    const {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      isDefault
    } = req.body;
    
    // Validate required fields
    if (!fullName || !addressLine1 || !city || !state || !zipCode || !country || !phoneNumber) {
      return res.status(400).json({ message: 'Required address fields are missing' });
    }
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Create new address
    const newAddress = {
      fullName,
      addressLine1,
      addressLine2: addressLine2 || '',
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      isDefault: isDefault || false
    };
    
    // If this is set as default, update other addresses
    if (newAddress.isDefault && user.addresses && user.addresses.length > 0) {
      user.addresses.forEach(address => {
        address.isDefault = false;
      });
    }
    
    // If this is the first address, set as default
    if (!user.addresses || user.addresses.length === 0) {
      newAddress.isDefault = true;
    }
    
    // Add to addresses array
    if (!user.addresses) {
      user.addresses = [];
    }
    
    user.addresses.push(newAddress);
    await user.save();
    
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Add user address error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user address
const updateUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      isDefault
    } = req.body;
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find address
    const addressIndex = user.addresses.findIndex(
      address => address._id.toString() === addressId
    );
    
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    // Update address fields
    if (fullName) user.addresses[addressIndex].fullName = fullName;
    if (addressLine1) user.addresses[addressIndex].addressLine1 = addressLine1;
    if (addressLine2 !== undefined) user.addresses[addressIndex].addressLine2 = addressLine2;
    if (city) user.addresses[addressIndex].city = city;
    if (state) user.addresses[addressIndex].state = state;
    if (zipCode) user.addresses[addressIndex].zipCode = zipCode;
    if (country) user.addresses[addressIndex].country = country;
    if (phoneNumber) user.addresses[addressIndex].phoneNumber = phoneNumber;
    
    // Handle default status
    if (isDefault !== undefined) {
      // If setting as default, update other addresses
      if (isDefault && !user.addresses[addressIndex].isDefault) {
        user.addresses.forEach((address, index) => {
          if (index !== addressIndex) {
            address.isDefault = false;
          }
        });
      }
      
      user.addresses[addressIndex].isDefault = isDefault;
      
      // Ensure at least one address is default
      if (!isDefault && user.addresses.every(address => !address.isDefault)) {
        user.addresses[0].isDefault = true;
      }
    }
    
    await user.save();
    
    res.json(user.addresses[addressIndex]);
  } catch (error) {
    console.error('Update user address error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user address
const deleteUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    
    // Find user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find address
    const addressIndex = user.addresses.findIndex(
      address => address._id.toString() === addressId
    );
    
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    // Check if this is the only address
    if (user.addresses.length === 1) {
      return res.status(400).json({ message: 'Cannot delete the only address' });
    }
    
    // Check if this is the default address
    const isDefault = user.addresses[addressIndex].isDefault;
    
    // Remove address
    user.addresses.splice(addressIndex, 1);
    
    // If deleted address was default, set another one as default
    if (isDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }
    
    await user.save();
    
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete user address error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
}
