const CategoryController = require("./../controllers/Category.controller");
const router = require("express").Router();
const authenticateRequest = require("../validators/auth.validators.js");

router.post("/create", authenticateRequest(), CategoryController.addCategory);
router.get("/", CategoryController.getAllCategories);
router.delete("/:id", authenticateRequest(), CategoryController.deleteCategory);
router.patch("/:id", authenticateRequest(), CategoryController.updateCategory);
router.put("/:id", authenticateRequest(), CategoryController.updateCategory);

module.exports = router;
