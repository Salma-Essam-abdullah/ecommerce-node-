const Product = require("../db/models/product.model");


exports.showProducts = async(req,res) =>{
    try{
        const sellerId = req.user._id;
        const products = await Product.find({sellerId:sellerId})
         res.status(200).json({
           status: "success",
           results: products.length,
           data: {
               products,
           },
         });
       }catch(err){
         res.status(400).json({
           status:'failed',
           message :err
       })};
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user._id;
        const product = await Product.findOneAndDelete({ _id: productId, sellerId: sellerId });

        if (!product) {
            return res.status(400).json({
                status: "failed",
                message: "Product not found or you are not authorized to delete this product",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.updateProduct = async (req,res)=>{
    try {
        if( req.fileUploadErr){
            res.status(422).json({
              message:'invalid file type'
            })
          }
          else{
            const { name, description, price, soldItems, totalItems } = req.body;
          const photos = req.files.map(file => {
            return `${req.protocol}://${req.headers.host}/${req.destinationFile}/${file.filename}`;
          });
        
        const productId = req.params.productId;
        const sellerId = req.user._id;
        const Updatedproduct = await Product.findOneAndUpdate({ _id: productId, sellerId: sellerId},{ name, description, price, soldItems, totalItems ,photos},{new:true,runValidators:true});

        if (!Updatedproduct) {
            return res.status(400).json({
                status: "failed",
                message: "Product not found or you are not authorized to update this product",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            Updatedproduct
        });
    }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

exports.addProduct = async (req, res) => {
    try {
      if( req.fileUploadErr){
        res.status(422).json({
          message:'invalid file type'
        })
      }
      else{
      const { name, description, price, soldItems, totalItems } = req.body;
      const photos = req.files.map(file => {
        return `${req.protocol}://${req.headers.host}/${req.destinationFile}/${file.filename}`;
      });
      const newProduct = await Product.create({
        name,
        description,
        price,
        sellerId: req.user._id,
        soldItems,
        totalItems,
        photos 
      });
  
      res.status(201).json({
        status: "success",
        message: "Product added successfully",
        product: newProduct
      });
    }
    } catch (err) {
      console.error(err); 
      res.status(400).json({
        status: 'failed',
        message: err.message 
      });
    }
  };