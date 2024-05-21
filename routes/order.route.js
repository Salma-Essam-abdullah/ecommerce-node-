const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const orderController = require("../controllers/order.controller")

 const endPoints = require('../endPoints/order.endPoint')

 router.route("/addOrder").post(auth(endPoints.addOrder),orderController.addOrder)


module.exports = router;
