const {access} = require('../middleware/auth')

const endPoints = {
    getAllProducts: [access.admin,access.seller],
    addProduct :  [access.seller],
    getProductById : [access.seller],
    updateProduct : [access.seller],
    deleteProduct : [access.seller]
}

module.exports = endPoints;