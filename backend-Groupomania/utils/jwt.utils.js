const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "SIGNATURETOKENACHANGER"

// exports functions
module.exports = {
generateTokenForUser: (userData) => {
return jwt.sign({
    userId: userData.id,
    isAdmin: userData.isAdmin
},
JWT_SIGN_SECRET,
{expiresIn: '24h'
})

},

parseAuthorization: (authorization) => {
    console.log(authorization)
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
   
},
getUserId: (authorization) => {
    var userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    console.log(token)
    
    if (token != null) {
        try {
            const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            console.log(jwtToken)
            if (jwtToken != null)
            userId = jwtToken.userId;
           
            
        }
        catch (error) {
            
    }
   
    return userId;
}

}}