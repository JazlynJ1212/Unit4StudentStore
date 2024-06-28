const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class Order {
// Function to get all orders
async getAllOrders() {
    return prisma.orders.findMany({
    include: {
    order_items: true,
    },
});
}
// Function to get order by ID
async getOrderById(id) {
    return prisma.orders.findUnique({
    where: { order_id: parseInt(id) },
    include: {
    order_items: true,
},
});
}
// Function to create a new order
async createOrder(orderData) {
    return prisma.orders.create({ data: orderData });
}

// Function to update an order
async updateOrder(id, orderData) {
    return prisma.orders.update({
    where: { order_id: parseInt(id) },
    data: orderData,
});
}
// Function to delete an order
async deleteOrder(id) {
    return prisma.orders.delete({
    where: { order_id: parseInt(id) },
});
}
// Function to calculate order total
async calculateTotalPrice(orderId) {
    const order = await this.getOrderById(orderId);
    if (!order) {
    throw new Error("Order not found");
    }
    const totalPrice = order.order_items.reduce((total, item) => {
    return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
}
}
// Export the class instance
module.exports = new Order();