const obj = require('../logger/logger')
const help = require('../util/helper') 
const case2 = require('../validator/formatter')
const express = require('express');
var mydate = require('current-date');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.printMessage('thorium')
    res.send('My first ever api of the week!')
    help.printDate()
    res.send(new Date().toLocaleDateString('en-US', options))
    help.printMonth(n)
    obj.welcome('welcome to my application. I am Shabdika Pandey and a prt of FunctionUp thorium cohort')
    res.send(case2.page)
    res.send(case2.page2)
    mydate.Date1()
});

module.exports = router;
// adding this comment for no reason