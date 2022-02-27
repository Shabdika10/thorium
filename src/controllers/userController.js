const UserModel= require("../models/userModel")

const createNewBook = async function (req, res) {
    let data= req.body
    let bookInfo= await UserModel.create(data)
    res.send({msg: bookInfo})
}

const listOfBook= async function (req, res) {
    let allBooks= await UserModel.find()
    res.send({msg: allBooks})
}

module.exports.createNewBook= createNewBook
module.exports.listOfBook= listOfBook