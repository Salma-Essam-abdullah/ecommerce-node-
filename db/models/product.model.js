const mongoose  = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true, 'A product must have a name'],
      trim:true
    },
    description :{
        type:String,
        required: [true , 'A product must have description']
    },
    photos: {
      type: [String],
      required: [true, "Product images are required"],
    },
    price:{
        type:Number,
        required: [true , 'A product must have price']
    },
    sellerId:{
      type: mongoose.Types.ObjectId,
      ref:'User',
      required: true
    },
    // categoryId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "categoryId  is required"],
    // },
     
    soldItems: Number,
    totalItems: Number,
    
  },
  {timestamps:true}
)
  
  const Product = mongoose.model('Product',productSchema);
  
module.exports = Product;