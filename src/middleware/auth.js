const jwt = require("jsonwebtoken")

const mid1 = function (req, res, next) {

    let token = req.headers["x-Auth-Token"];
    console.log(token);
    if (!token) {
        res.send({ status: false, msg: "token is not present" });
    }
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken) {
        res.send({ status: false, msg: "invalid token" });
        next()
    }
}

const authorise = function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) return res.send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'functionup-thorium')

    if (!decodedToken) return res.send({ status: false, msg: "token is not valid" })

    let validData = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (validData != userLoggedIn) return res.send({ status: false, msg: 'not authorized' })

    let user = async function(req,res,next) {
    await userModel.findById(req.params.userId)
    if (!user) 
        return res.send({ status: false, msg: 'No such user exists' })
     else 
         res.send({ atatus: true, data: user })
    next()
    }
}



module.exports.mid1 = mid1;
module.exports.authorise = authorise;

