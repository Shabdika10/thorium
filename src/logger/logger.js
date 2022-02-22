let url = 'https://www.google.com'

function printMyMessage(message)
{
    console.log(message);
}
// to make module public
module.exports.endpoint = url
module.exports.printMessage = printMyMessage


function welcome(){
    console.log('welcome to my application. I am Shabdika Pandey and a prt of FunctionUp thorium cohort')
}
module.exports.welcome = welcome
