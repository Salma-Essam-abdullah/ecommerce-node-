const {access} = require('../middleware/auth')


const endPoints = {
    updateUser: [access.admin, access.customer, access.seller],
    deleteUser: [access.admin],
    getProfile: [access.admin, access.customer, access.seller],
    getYourOrder: [access.admin, access.customer, access.seller],
    showSellerProducts :  [access.admin, access.seller],
    deleteProduct : [access.seller],
    updateProduct : [access.seller],
    addProduct : [access.seller],
    searchProduct : [access.customer]
};
module.exports = endPoints;