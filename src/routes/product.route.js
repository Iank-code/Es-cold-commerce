const ProductController = require("./../controllers/Product.controller");
const router = require("express").Router();
const authenticateRequest = require("../validators/auth.validators.js");

router.post("/create", authenticateRequest(), ProductController.createProduct);
router.get("/", authenticateRequest(), ProductController.getAllProducts);
router.get("/:id", authenticateRequest(), ProductController.getProductById);
router.delete(
  "/:id",
  authenticateRequest(),
  ProductController.deleteProduct
);

module.exports = router;
