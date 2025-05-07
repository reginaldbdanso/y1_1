const Product = require('../../models/Product');
// const driveService = require('../storage/driveService');
const getCloudinaryUrl = require('../storage/cloudinary');

class ProductService {
  async createProduct(productData, mainImageBuffer, thumbnailBuffers) {
    try {
      const mainImageUrl = mainImageBuffer ? await getCloudinaryUrl(mainImageBuffer) : null;
      const thumbnailUrls = thumbnailBuffers ? await Promise.all(thumbnailBuffers.map(getCloudinaryUrl)) : [];
      const product = await Product.create({
        ...productData,
        image: mainImageUrl,
        thumbnails: thumbnailUrls
      });

      return product;
    } catch (error) {
      throw new Error(`Product service failed to create product: ${error.message}`);
    }
  }

  async getProducts() {
    return Product.find()
    // .populate('seller', 'name email');
  }

  async getProductById(id) {
    const product = await Product.findById(id)
    // .populate('seller', 'name email');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // async deleteProduct(id, userId) {
  //   const product = await Product.findOne({ _id: id, seller: userId });
  //   if (!product) {
  //     throw new Error('Product not found or unauthorized');
  //   }

  //   // Extract fileId from Google Drive URL
  //   const fileId = this.extractFileIdFromUrl(product.imageUrl);
  //   if (fileId) {
  //     await driveService.deleteFile(fileId);
  //   }

  //   await product.remove();
  //   return { message: 'Product deleted successfully' };
  // }

  // extractFileIdFromUrl(url) {
  //   try {
  //     const match = url.match(/\/d\/([^/]+)/);
  //     return match ? match[1] : null;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}

module.exports = new ProductService();