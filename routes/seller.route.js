const express = require("express");

const router = express.Router();
const {auth} = require('../middleware/auth')
const endPoints = require('../endPoints/user.endPoint')

const sellerController = require("../controllers/seller.controller");
const {multerFun,validationFileType} = require('../services/multer')
const {validation} = require("../middleware/validation")
 const productValidation = require('../validation/product.validation')

router.route("/showProducts").get(auth(endPoints.showSellerProducts),sellerController.showProducts)
router.route('/deleteProduct/:productId').delete(auth(endPoints.deleteProduct),sellerController.deleteProduct);
router.route('/updateProduct/:productId').patch(auth(endPoints.updateProduct), multerFun('products/productImages',validationFileType.image).array('photos', 5),sellerController.updateProduct);

router.route("/addProduct").post(
  auth(endPoints.addProduct),
  multerFun('products/productImages',validationFileType.image).array('photos', 5),
  sellerController.addProduct
);

module.exports = router;
