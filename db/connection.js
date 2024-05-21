const mongoose  = require('mongoose')


const createConnection = () => {
mongoose.connect(process.env.DATABASE).then(() =>  console.log('Connected to database')).catch(err=>console.log(err))
}
  module.exports = createConnection;