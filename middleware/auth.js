var jwt = require('jsonwebtoken');
const User = require('../db/models/user.model')

const access = {
    admin:"admin",
    customer:"customer",
    seller:"seller"
}



const auth = (accessRoles) => {
    return async (req, res, next) => {
         
        const { authorization } = req.headers;

        if (!authorization || authorization == null || authorization == undefined || !authorization.startsWith("Bearer")) {
            res.status(400).json({
                message: "Unauthorized User"
            });
        } else {
            try {
                const decodedToken = authorization.split(" ");
                const decoded = jwt.verify(decodedToken[1], 'shhhhh');
                console.log(decoded);
                const userData = await User.findById(decoded.id);
                console.log(userData);
                if (userData) {
                    console.log("role",accessRoles)
                    if (accessRoles.includes(decoded.role)) {
                        req.user = userData;
                        next(); 
                    } else {
                        res.status(403).json({ message: "You are not authorized to access this data" });
                    }
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            } catch (error) {
                res.status(401).json({ message: "Invalid token" });
            }
        }
    };
};

module.exports ={ auth , access};