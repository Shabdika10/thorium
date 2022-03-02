const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
// const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")
const newbookController= require("../controllers/newbookController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

// router.post("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", newbookController.createBook  )

router.post("/createPublisher", publisherController.createPublisher)

router.get("/getBooks", newbookController.getBooks)

module.exports = router;