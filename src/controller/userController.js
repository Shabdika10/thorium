const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isvalidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}


// createUser.....................................................................

const createUser = async function (req, res) {

    try {

        const data = req.body
        const query = req.query
        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, message: 'This operation is not allowed' })
        }


        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide Data" })
        }

        if (!isValid(data.title)) {
            return res.status(400).send({ status: false, message: "Title required" })
        }
        if (!isvalidTitle(data.title)) {
            return res.status(400).send({ status: false, message: "Valid title required" })
        }


        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, message: "Name required" })
        }


        if (!isValid(data.phone)) {
            return res.status(400).send({ status: false, message: "Mobile number is required" })
        }

        if (!/^([+]\d{2})?\d{10}$/.test(data.phone.trim()) {
            return res.status(400).send({ status: false, message: "Please provide a valid moblie Number" })
        }

        let duplicateMobile = await userModel.findOne({ phone: data.phone })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, message: "Mobile number already exists" })
        }



        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, message: "Email required" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim())) {
            return res.status(400).send({ status: false, message: "Please provide a valid email" });
        }

        let duplicateEmail = await userModel.findOne({ email: data.email })
        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: "Email already exists" })
        }


        if (!isValid(data.password)) {
            return res.status(400).send({ status: false, message: "Password required" })
        }
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password.trim())) {

            return res.status(400).send({ status: false, message: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " })
        }


        const savedData = await userModel.create(data)

        return res.status(201).send({ status: true, userData: savedData })

    } catch (error) {

        return res.status(500).send({ Status: false, message: error.message })
    }
}

// user login..............................................................................

const userLogin = async function (req, res) {

    try {
        let data = req.body
        let query = req.query
        if (isValidRequestBody(query)) {
            return res.status(400).send({ status: false, message: 'This operation is not allowed' })
        }

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please input Some Data" })
        }

        if (!isValid(data.email)) {
            return res.status(401).send({ status: false, message: "Please input valid emailId" })
        }

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim())) {
            return res.status(400).send({ status: false, message: "Please provide a valid email" });
        }

        if (!isValid(data.password)) {
            return res.status(401).send({ status: false, message: "Please input valid password" })
        }

        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password.trim())) {

            return res.status(400).send({ status: false, message: "please provide a valid password with one uppercase letter ,one lowercase, one character and one number " })
        }

        const user = await userModel.findOne({ email: data.email, password: data.password })
        if (!user) {
            return res.status(404).send({ status: false, message: "User not  found" })
        }

       
        const userID = user._id        
        const payLoad = {userId : userID }
        const secretKey = "group17project3almostdone"

       // creating JWT
        const token = jwt.sign(payLoad, secretKey,  {expiresIn : "1hr"})
        
        res.header("group17", token)

        res.status(200).send({status: true, message: "login successful" , data: token})

    } catch (err) {
       return res.status(500).send({ status: false, message: err.message })
    }
}





module.exports.createUser = createUser
module.exports.userLogin = userLogin
