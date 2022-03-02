const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    // author_id: Number,
    // author_name: String,
    // age:Number,
    // address:String
 name : String,
 headQuarter: String
}, { timestamps: true });

module.exports = mongoose.model('newPublisher', publisherSchema)
