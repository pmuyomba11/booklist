const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title : {type: String, required: true},
    author: {type: String, required: true},
    completed: Boolean
});


//Creating the Book model
const Book = mongoose.model('Book', bookSchema);


//Exporting the Book MODULES
module.exports = Book;