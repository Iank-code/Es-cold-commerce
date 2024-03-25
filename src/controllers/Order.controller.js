const Customer = require("../models/customer.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");

class OrderController {
  constructor() {}

  async createOrder(req, res) {
    // Getting userId if token is still valid
    const { id } = req.user;

    // Getting items from the request body
    const { total_price, price, productId, quantity } = req.body;

    // Finding the user in the database
    const customer = await Customer.findById(id);

    // Checking to see if the user is present in the database
    if (!customer) {
      res.status(404).json("User not found");
    }

    // Creating & saving ordedr
    const newOrder = new Order({
      price,
      total_price,
      customerId: customer._id,
      status: "Pending",
    });

    await newOrder.save();

    // Creating & saving order item
    const newOrderItem = new OrderItem({
      orderId: newOrder._id,
      productId: productId,
      quantity,
    });

    await newOrderItem.save();
  }
}

module.exports = new OrderController();
