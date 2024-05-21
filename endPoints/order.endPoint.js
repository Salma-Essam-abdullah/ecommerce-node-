const {access} = require('../middleware/auth')

const endPoints = {
    addOrder: [access.customer],

}

module.exports = endPoints;