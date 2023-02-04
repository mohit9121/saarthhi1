// routes/api/books.js

const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const {v4: uuidv4} = require('uuid');
const path = require('path');


const DIR = './public/'; 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4 + '-' + fileName) 
    }
}, 
console.log(uuidv4)
);
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    } 
});

// Load Book model
const Product = require('../../models/Product');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('product route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => { 
  Product.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', upload.single('photo'), (req, res) => {
  console.log(req.body.photo);
  Product.create(req.body)
    .then(book => res.json({ msg: 'Product added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;