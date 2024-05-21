
const mongoose  = require('mongoose')
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = process.env.SALT_ROUNDS;

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true, 'A user must have a name'],
    },
    email:{
        type:String,
        required:[true, 'A user must have an email'],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:Number,
    role: { 
    type: String ,
    default:'customer',
    enum: ['customer', 'seller','admin'],
    required: true }
  },
  {timestamps:true}
)
userSchema.pre('save', async function(next) {
  try {
     
      const hash = await bcrypt.hash(this.password, parseInt(saltRounds));
      this.password = hash;
      next();
  } catch (error) {
      next(error); 
  }
});
          

const updateHooks = ["findOneAndUpdate","findOneAndDelete"];
updateHooks.forEach((key)=>{
  userSchema.pre(key, async function(next) {
    try {
    
      let data = await this.model.findOne(this.getQuery());
      this.set({__v:data.__v+1});
      next();
    } catch (error) {
      next(error); 
    }
  });
})

userSchema.pre('findOneAndUpdate', async function(next) {
  try {
    if (this._update.password) {
      const hash = await bcrypt.hash(this._update.password, parseInt(saltRounds));
      this._update.password = hash;
    }
    let data = await this.model.findOne(this.getQuery());
    this.set({__v:data.__v+1});
    next();
  } catch (error) {
    next(error); 
  }
});

  const User = mongoose.model('User',userSchema);
  
module.exports = User;