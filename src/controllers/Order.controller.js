const Logger = require("../middlewares/logger/logger");
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

    res
      .status(200)
      .json({ message: "Order created successfully", orderId: newOrder });
  }

  async getOrderOfACustomer(req, res) {
    try {
      const { id } = req.user;

      // Finding the user in the database
      const customer = await Customer.findById(id);

      // Checking to see if the user is present in the database
      if (!customer) {
        res.status(404).json("User not found");
      }

      // Find all orders for the customer
      const customerOrders = await Order.find({ customerId: id });

      // Iterate over each order to fetch its order items
      let allOrderItems;
      for (const order of customerOrders) {
        allOrderItems = await OrderItem.find({
          orderId: order._id,
        }).populate("orderId");
      }

      res.status(200).json({ message: "Orders found", orders: allOrderItems });
    } catch (error) {
      Logger.error(error);
    }
  }
}

module.exports = new OrderController();
