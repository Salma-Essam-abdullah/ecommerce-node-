const User = require('../db/models/user.model')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('../db/models/order.model');
const Product = require('../db/models/product.model');

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, cPassword,phone } = req.body;
     
                try {
                    const user = new User({ name, email, password, cPassword ,phone});
                    const newUser = await user.save();
                    res.status(201).json({
                        status: "success",
                        message: "User signed up successfully",
                        user: newUser,
                    });
                } catch (err) {
                    res.status(400).json({
                        status: 'failed',
                        message: err
                    });
                }
               
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message 
        });
    }
}


exports.updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password, cPassword, phone ,role} = req.body;
     
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found'
        });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { name, email, password, cPassword, phone,role },
        { new: true, runValidators: true }
      );
  
      res.status(201).json({
        status: 'success',
        message: 'User updated successfully',
        user: updatedUser,
      });
  
    } catch(err) {
      res.status(400).json({
        status: 'failed',
        message: err.message 
      });
    }
  }
  

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().select('-password');
        res.status(201).json({
            status: "success",
            results: users.length,
            message: "users retreived successfully",
            users: users,
          });
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           })
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        await User.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message: "user deleted successfully"
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ id: user._id, name: user.name ,role:user.role ,isLogin:true}, 'shhhhh',{expiresIn:'1h'});
                console.log(token);
                res.status(200).json({
                    status: "success",
                    message: "User logged in successfully",
                    token
                });
            } else {
                res.status(400).json({
                    status: 'failed',
                    message: "Wrong password"
                });
            }
        } else {
            res.status(400).json({
                status: 'failed',
                message: "Wrong email"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};


exports.getProfile = async (req,res) =>{
    try{
        console.log(req.user);
        const id = req.user._id;
        const userProfile = await User.findById(id);
        if(userProfile){
           
        res.status(200).json({
            status:"success",
            message: "user found successfully",
            user : userProfile
        }) 
        }else{
            res.status(400).json({
                message : "user not found"
            })
        }
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           })
    }
}



exports.getYourOrder = async(req,res)=>{
    try{
    const id = req.user._id;
    const orders =await Order.find({userId:id});
    res.status(200).json({
        status:"success",
        message: "orders found successfully",
        orders : orders
    }) 
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           })
    }
}
exports.searchByProductName = async(req,res)=>{
    try{
        const productName = req.body.name;
        const products = await Product.find({name:productName})
        if(products.length == 0){
            res.status(400).json({
                message : "product not found"
            })
        }else{
        res.status(200).json({
            status:"success",
            message: `products found with name  = ${productName}`,
            results: products.length,
            products : products
        }) 
    }
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           }); 
    }
}

exports.searchbySeller = async(req,res)=>{
    try{
        const seller = req.body.seller;
        const products = await Product.find({sellerId:seller})
        console.log(products);
        if(products.length == 0){
            res.status(400).json({
                message : "product not found"
            })
        }else{
        res.status(200).json({
            status:"success",
            message: `products found for this seller`,
            results: products.length,
            products : products
        }) 
    }
    }catch(err){
        res.status(400).json({
            status:'failed',
            message :err
           }); 
    }
}