const OrderController = require("../controllers/Order.controller.js");
const router = require("express").Router();
const authenticateRequest = require("../validators/auth.validators.js");

router.post("/create", authenticateRequest(), OrderController.createOrder);
router.get(
  "/getCustomerOrder",
  authenticateRequest(),
  OrderController.getOrderOfACustomer
);

module.exports = router;
