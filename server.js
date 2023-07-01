const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book')

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

//MIDDLEWARE
app.use(express.urlencoded({extended: true}));

//Database Connection....
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser :true ,
    useUnifiedTopology  : true
});


//create Route
app.post('/books', async(req,res) => {
    if(req.body.competed === 'on'){
        req.body.competed = true;
    } else {
        req.body.completed = false;
    }
    const createdBook = await Book.create(req.body);
    res.redirect('/books');
})

//Index Route
app.get('/books', async (req,res) => {
    const allBooks = await Book.find({})
    res.render('index.ejs', {
        books: allBooks
    })
})

//New Route
app.get('/books/new', (req,res) => {
    res.render('new.ejs');
});

//Show Route
app.get('/books/:id', async(req,res) => {
    const foundBook = await Book.findById(req.params.id);
    res.render('show.ejs', {
        book: foundBook
    });
})

//Database connection error/success
const db = mongoose.connection;
db.on('connected', () => console.log('Mongo connected....'));
db.on('disconnected', () => console.log('Database Disconnected....'));
db.on('error', (err) => console.log(err.message, + 'is mongo not running...??'))


//Port Listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})