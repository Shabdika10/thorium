const jwt =require("jsonwebtoken")

let mid1=function(req,res,next){

    let token = req.headers["x-Auth-Token"];
    console.log(token);

    if (!token) {
        token= req.headers["x-auth-token"];
    }

    if (!token){
         res.send({status :false ,msg: "token is not present"});
    }


    let decodedToken=jwt.verify(token, "functionup-thorium");
    if (!decodedToken){
         res .send ({status:false ,msg :"invalid token"});
        next()
    }
}

module.exports.mid1 = mid1;

