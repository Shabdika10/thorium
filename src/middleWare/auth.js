const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const bookModel = require('../models/bookModel')

const authenticate = async function(req, res, next){
    try{
        const token = req.headers['group17']
        const secretKey = "group17project3almostdone"

        if(!token){
        return res.status(400).send({status: false, message : "Please provide token"})
        }

        const decodedToken = jwt.verify(token, secretKey) 

        if(!decodedToken){
        return res.status(401).send({status : false, message: "authentication failed"})
        }
        // setting a key in request,  "decodedToken" which consist userId and exp.
        // req.decodedToken = decodedToken
        
        next()

    }catch(err){
       
        res.status(500).send({error : err.message})
    }
}

const authorise = async function(req, res,next){
    try{
        const bookId = req.params.bookId
        const decodedToken = req.decodedToken
       
        if(mongoose.Types.ObjectId.isValid(bookId) == false){
        return res.status(400).send({status : false, message : "bookId is not valid"})
        }

        
        const book = await bookModel.findOne({_id : bookId, isDeleted : false})

        if(!book){
        return res.status(404).send({status : false, message : "Book has already been deleted"})    
        }

        if((decodedToken.userId != book.userId)){
        return res.status(403).send({status : false, message : "unauthorized access"})
        }
        // checking jwt token expiry
        // if((Date.now() > (decodedToken.exp * 1000))){
        // return res.status(403).send({status : false, message : `session expired, please login again`})
        // }
        
        next()

    }catch(err){
        res.status(500).send({error : err.message})
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise



















































// const authentication = async function (req, res, next) {
//     try {
//         const token = req.headers["group17"];
//         if (!token) {
//             return res.status(401).send("token is not present")
//         }
        
//             let decodedtoken = jwt.verify(token, "project3group17")
//             if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
//             next();
    

//     } catch (err) {
//         return res.status(500).send(err.message)
//     }
// }

// const authorisation = async function (req, res, next) {
//     try {
//         const bookId = req.params.bookId
//         const bookDoc = await bookModel.findOne({_id: bookId})
//         console.log(bookDoc)

//        let userid = bookDoc.userId
//        console.log(userid)

//         let token= req.headers['group17'];
//         // if (!token) {
//         //     return res.status(404).send("token is not correct");
//         // } 
//          let decodedtoken = jwt.verify(token,"project3group17")
//         if(decodedtoken.userid !=userid) return res.status(403).send({status:false,msg:'unauthorise access'})
        

//         // if (validData != userLoggedIn) return res.status(403).send({ status: false, msg: 'not authorized' })

//         // let user = async function (req, res, next) {
//         //     await userModel.findById(req.params.userId)

// //             if (!user)
// //                 return res.status(404).send({ status: false, msg: 'No such user exists' })
// //             else
// // return res.status(200).send({ status: true, data: user })
// //         }
//         next();
//     } catch (err) {
//         return res.status(500).send({ msg: err.message })
//     }
// }


// module.exports.authentication = authentication;
// module.exports.authorisation = authorisation




     