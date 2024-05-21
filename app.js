const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route")
const orderRoutes = require('./routes/order.route')
const sellerRoutes = require('./routes/seller.route')

const path = require('path');
app.use(express.json()); 
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/seller", sellerRoutes);

module.exports = app;
