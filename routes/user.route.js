const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const {auth} = require('../middleware/auth')
const {validation} = require("../middleware/validation")
const userValidation = require('../validation/user.validation')
const endPoints = require('../endPoints/user.endPoint')

router.route("/signUp").post( validation(userValidation.signUpValidation) ,userController.signUp);
router.route("/signIn").post(validation(userValidation.signInValidation) ,userController.signIn);
router.route("/:id").patch(auth(endPoints.updateUser),validation(userValidation.updateUserValidation),userController.updateUser).delete(auth(endPoints.deleteUser),userController.deleteUser);
router.route("/profile").get(auth(endPoints.getProfile),userController.getProfile);
router.route("/").get(userController.getAllUsers);
router.route("/getYourOrder").get(auth(endPoints.getYourOrder),userController.getYourOrder)
router.route("/searchByName").get(auth(endPoints.searchProduct),userController.searchByProductName)
router.route("/searchBySeller").get(auth(endPoints.searchProduct),userController.searchbySeller)

module.exports = router;
