const CustomerController = require("./../controllers/Customer.controller");
const router = require("express").Router();
const authenticateRequest = require("../validators/auth.validators.js");

router.post("/register", CustomerController.Register);
router.post("/login", CustomerController.Login);
// router.post("/user", authenticateRequest(), CustomerController.Profile);

module.exports = router;
