const { validateToken } = require("../Services/auth");

function authentication(){
    return (req , res , next) => {
       
        const token = req.cookies?.token;
        console.log("token : " , token)
        if(!token){
            return next();
        }
        const payload = validateToken(token);
      console.log("payload:" , payload)
        if(!payload){
            return next();
        }
        
        req.user = payload;
        console.log(req.user)
       
        return next();

        
    }
}
module.exports = authentication;