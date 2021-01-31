const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;