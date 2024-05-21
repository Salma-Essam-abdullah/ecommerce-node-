const mongoose  = require('mongoose')

const sellerSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true, 'A seller must have a name'],
      unique:true,
      trim:true
    }
    
  },
  {timestamps:true}
)
  
  const Seller = mongoose.model('Seller',sellerSchema);
  
module.exports = Seller;