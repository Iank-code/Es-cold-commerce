const CategoryController = require("./../controllers/Category.controller");
const router = require("express").Router();
const authenticateRequest = require("../validators/auth.validators.js");

router.post("/create", authenticateRequest(), CategoryController.addCategory);
router.get("/all", authenticateRequest(), CategoryController.getAllCategories);
route.delete("/:id", authenticateRequest(), CategoryController.deleteCategory);

module.exports = router;
