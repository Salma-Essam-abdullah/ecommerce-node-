const Product = require('../db/models/product.model')


exports.updateProduct = async(req, res) => {
  try{
  const id = req.params.id;
  const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
      res.status(200).json({
        status: "success",
        message: "product updated successfully",
        product: updatedProduct,
      });  
}catch(err){
  res.status(400).json({
    status:'failed',
    message :err
   })
}
};

exports.getAllProducts= async(req, res) => {
  try{

 const products = await Product.find()
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

exports.getProductById =async (req, res) => {
  try{
  const id = req.params.id;
  const product =await Product.findById(id);
  if(product){
  res.status(200).json({
    status: "success",
    data: {
        product,
    },
  });
}else{
  res.status(400).json({
    message :"product not found"
})
}
}catch(err){
  res.status(400).json({
    status:'failed',
    message :err
})
}
};



exports.deleteProduct =async (req, res) => {
  try{
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "product deleted successfully",
  });
  }catch(err){
    res.status(400).json({
      status:'failed',
      message :err
     })
  }
  
};