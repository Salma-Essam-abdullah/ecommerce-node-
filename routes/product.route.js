const express = require("express");
const router = express.Router();
const productController = require('../controllers/product.controller')
const {auth} = require('../middleware/auth')

 const endPoints = require('../endPoints/product.endPoint')



router
  .route("/:id")
  .get(auth(endPoints.getProductById) ,productController.getProductById)
  .patch(auth(endPoints.updateProduct) ,productController.updateProduct)
  .delete(auth(endPoints.deleteProduct) ,productController.deleteProduct);

module.exports = router;
