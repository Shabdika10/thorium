const express = require('express');
const router = express.Router();

// router.get('/students/:name', function(req, res) {
//     let studentName = req.params.name
//     console.log(studentName)
//     res.send(studentName)
// })

// 2.. 
router.get('/movies/:moviesId', function(req, res) {
    mov = ["fukrey","delhi","dabang","rockstar","suryavansh"]

    let value = req.params.moviesId
    if ( value>mov.length-1)
    {
    res.send ("doesn't exists")
    }else{
        res.send(mov[value])
    }
    
});




// 3.. 
router.get('/moviez', function(req, res) {
    res.send([{id: 1 , name: 'the shining'},{id:2 , name:'incendies'}, {id:3 ,name: 'rang de basanti' },{id:4 ,name= 'finding demo'}])
});




// 4.. 
router.get('/films/:filmId', function(req, res) {
    let movi=[{id: 1 , name: 'the shining'},{id:2 , name: 'incendies'}, {id:3 ,name: 'rang de basanti' },{id:4 ,name= 'finding demo'}]
    let value= req.params.filmId;
    let found =false;
    for (i=0;i<movi.length;i++){
        if (movi[i].id==value){
            res.send(movi[i])
            break
        }
    }
    if (found==false){
        res.send('no movie exists with this id')
    }
})

// 5.. 
router.get('/sol1', function(req, res) {
    let arr=[1,2,3,5,6,7]
    let total =0;
    for(var i in arr) {
        total +=arr[i]
    }
    let lastDigit= arr.pop()
    let consecutivesum=lastDigit*(lastDigit+1) / 2;
    let missingNumber=consecutivesum -total
    res.send({ data :missingNumber})
});

   
// router.post ("/testpost-3", function(req, res) {
//     let arr=[12, "functionup",34, 92390, "pk"]
//     let ele = req.body.element
//     arr.push (ele)
//     res.send({ msg : arr, status :true })
// })

module.exports = router;
