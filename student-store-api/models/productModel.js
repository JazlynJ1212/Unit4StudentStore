const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Product {
  // Function gets all the products
  //
  async getAllProducts(filter = {}, orderBy = {}) {
    return prisma.products.findMany({
      where: filter,
      orderBy: orderBy,
    });
  }

  // Function to get product by ID
  async getProductById(id) {
    return prisma.products.findUnique({ where: { id: parseInt(id) } });
  }

  // Function to create a new product
  async createProduct(productData) {
    return prisma.products.create({ data: productData });
  }

  // Function to update a product
  async updateProduct(id, productData) {
    return prisma.products.update({
      where: { id: parseInt(id) },
      data: productData,
    });
  }

  // Function to delete a product
  async deleteProduct(id) {
    return prisma.products.delete({ where: { id: parseInt(id) } });
  }
}
// async deleteProduct(id) {
//   return prisma.products.delete({
//   where: { id: parseInt(id) },
//   });
//   }
// }

// Export the class instance
module.exports = new Product();
