const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    try{
        const cookie = req.cookies['jwt'];
        if(!cookie){
            res.status(401);
            throw new Error("No JWT cookie found!"); 
        }

        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if(!claims || !claims.user || !claims.user.id){
            res.status(401);
            throw new Error("Invalid token!");
        }
        req.user = claims.user;
        next();
    } catch(e) {
        res.status(401);
        throw new Error("User is not authorized or token is missing.");
    }
});

module.exports = validateToken;