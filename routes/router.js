const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const bookModelSchema = require("../model/bookModelSchema");

// home/index router
router.get('/', (req, res) => {
    res.render('index');
})


// get all the books data
router.get('/books', async (req, res) => {
    try {
         await bookModelSchema.find((err, docs) => {
            if(err) throw err;
            res.render("books", {
                bookDatas : docs
            })
        });
    } catch (err) {
        res.status(401).json({message:err.message});
    }
})



// add book page router
router.get('/addbook', (req, res) => {
    res.render('addbook');
})

// creating/posting new books
router.post('/', async (req, res) => {
    const { book, author, price } = req.body;
    try {
        newBook = new bookModelSchema({
            book,
            author,
            price
        });
        await newBook.save();
        // res.status(201).json(newBook);
        res.redirect('/books');
    } catch (err) {
        res.status(401).json({msg : err});
    }
 });

//  route to show update elements
router.get('/edit/:id', async (req, res) => {
    await bookModelSchema.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, docs) => {
        res.render("edit", {
            dataToUpdate : docs
        })
    })
})


// route to update element
router.post('/edit/:id', async (req, res, next) => {
    await bookModelSchema.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err) => {
        if(err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/books');
        }
    })
})


// router to delete
router.get('/:id', async (req, res) => {
    await bookModelSchema.findByIdAndDelete({_id: req.params.id}, (err) => {
        if(err) {
            console.log(err);

        } else {
            res.redirect('/books');
        }
    })
})

 module.exports = router;