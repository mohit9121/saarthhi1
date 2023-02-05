const express = require('express');
const router = express.Router();

const Blog = require('../../models/Blog');

router.post('/', async (req, res) => {
    console.log("hello1"); 
    const blog = new Blog(req.body);
    try {
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', (req, res) =>{
    Blog.find()
    .then(blogs => res.send(blogs))
    .catch(err => res.status(404).json({ nobooksfound: 'No Blogs found' }));
})
// Blog.create(req.body)
//     .then(book => res.json({ msg: 'Product added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
// });

module.exports = router;