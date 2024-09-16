const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"please provide the book's title"]
    },
    author: {
        type: String,
        required: [true,"please provide the auther's name"]
    },
    publishedDate: {
        type: Date,
        required: [true,"please provide the book published data"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"please provide the user's id"]
    }
})

const bookModel = mongoose.model('Book',bookSchema);
module.exports = {bookModel};