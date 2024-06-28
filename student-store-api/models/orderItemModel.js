// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// class OrderItems {
//   // Function gets all the order items
//   async getAllOrderItems() {
//     return prisma.order_items.findMany();
//   }

//   // Function to get order item by ID
//   async getOrderItemById(id) {
//     return prisma.order_items.findUnique({ where: { order_item_id: parseInt(id) } });
//   }

//   // Function to create a new order item
//   async createOrderItem(orderItemData) {
//     return prisma.order_items.create({ data: orderItemData });
//   }

//   // Function to update an order item
//   async updateOrderItem(id, orderItemData) {
//     return prisma.order_items.update({
//       where: { order_item_id: parseInt(id) },
//       data: orderItemData,
//     });
//   }

//   // Function to delete an order item
//   async deleteOrderItem(id) {
//     return prisma.order_items.delete({ where: { order_item_id: parseInt(id) } });
//   }

// //function to add items to an existing order 
// async addItemsToOrder(orderId, items) {
//   const orderItems = items.map(item => ({
//     ...item,
//     order_id: parseInt(orderId),
//   }));
// }
// }
// // Export the class instance
// module.exports = new OrderItems();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class OrderItems {
  async getAllOrderItems() {
    return prisma.order_items.findMany();
  }

  async getOrderItemById(id) {
    return prisma.order_items.findUnique({ where: { order_item_id: parseInt(id) } });
  }

  async createOrderItem(orderItemData) {
    return prisma.order_items.create({ data: orderItemData });
  }

  async updateOrderItem(id, orderItemData) {
    return prisma.order_items.update({
      where: { order_item_id: parseInt(id) },
      data: orderItemData,
    });
  }

  async deleteOrderItem(id) {
    return prisma.order_items.delete({ where: { order_item_id: parseInt(id) } });
  }

  async addItemsToOrder(order_id, items) {
    const orderItemsData = items.map(item => ({
      order_id: parseInt(order_id),
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    return prisma.order_items.createMany({
      data: orderItemsData,
    });
  }
}

module.exports = new OrderItems();
