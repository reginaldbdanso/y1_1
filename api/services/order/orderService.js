const Order = require('../../models/Order');
const driveService = require('../storage/driveService');

class OrderService {
  async createOrder(orderData, imageBuffer, userId) {
    try {
      const filename = `order-${Date.now()}.jpg`;
      const imageUrl = await driveService.uploadFile(imageBuffer, filename);
      
      const order = await Order.create({
        ...orderData,
        imageUrl,
        seller: userId
      });

      return order;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async getOrders() {
    return Order.find()
    // .populate('seller', 'name email');
  }

  async getOrderById(id) {
    const order = await Order.findById(id)
    // .populate('seller', 'name email');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async deleteOrder(id, userId) {
    const order = await Order.findOne({ _id: id, seller: userId });
    if (!order) {
      throw new Error('Order not found or unauthorized');
    }

    // Extract fileId from Google Drive URL
    const fileId = this.extractFileIdFromUrl(order.imageUrl);
    if (fileId) {
      await driveService.deleteFile(fileId);
    }

    await order.remove();
    return { message: 'Order deleted successfully' };
  }

  extractFileIdFromUrl(url) {
    try {
      const match = url.match(/\/d\/([^/]+)/);
      return match ? match[1] : null;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new OrderService();