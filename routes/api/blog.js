const express = require('express');
const router = express.Router();

const Blog = require('../../models/Blog');
const Items = require('../../models/Item');
const Comment = require('../../models/Comment');

router.post('/', async (req, res) => {
    const blog = new Blog(req.body);
    try {
        await blog.save();
        res.send(blog); 
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', (req, res) => {
    Blog.find({})
        .sort({ date: -1 })
        .then(blogs => res.send(blogs))
        .catch(err => res.status(404).json({ nobooksfound: 'No Blogs found' }));
});

router.get("/itemsall", function (req, res) {
    // console.log("hello ji");
    Items.find({}, function (err, items) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(items);
    });
});

router.get('/search', (req, res) => {
    const { district, category } = req.query;
    // console.log(district + category);
    let query = {};

    if (district) {
        query.district = district;
    }

    if (category) {
        query.category = category;
    }
    Items.find(query)
        .then((items) => res.json(items))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:userId", async (req, res) => {
    // console.log("hello prabhu "); 
    try {
        const items = await Items.find({ userId: req.params.userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Blog.create(req.body)
//     .then(book => res.json({ msg: 'Product added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
// });

router.get('/show-item/:productId', (req, res) => {
    Items.findById(req.params.productId)
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'No Item found' }));
})

router.delete('/delete-item/:id', (req, res) => {
    Items.findByIdAndRemove(req.params.id, req.body)
        .then(resp => { res.json({ mgs: "item deleted succesfully " }) })
        .catch(err => res.status(404).json({ error: 'item is find' }))
})

router.get('/get-blog/:blogId', (req, res) => {
    // console.log("hello ji");
    Blog.findById(req.params.blogId)
        .then(blog => res.json(blog))
        .catch(err => res.status(404).json({ nobookfound: 'No Blog found' }));
})

router.put('/update-item/:id', (req, res) => {
    Items.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.put('/increase-like/:blogId', (req, res) => {
    Blog.findByIdAndUpdate(req.params.blogId, { $inc: { likes: 1 } }, { new: true })
        .then(blognew => res.json(blognew.likes))
        .catch(err =>
            res.status(400).json({ error: err.message })
        );
})
router.put('/increase-dislike/:blogId', (req, res) => {
    Blog.findByIdAndUpdate(req.params.blogId, { $inc: { dislikes: 1 } }, { new: true })
        .then(blognew => res.json(blognew.dislikes))
        .catch(err =>
            res.status(400).json({ error: err.message })
        );
})

router.put('/increase-comment/:blogId', (req, res) => {
    Blog.findByIdAndUpdate(req.params.blogId, { $inc: { comments: 1 } }, { new: true })
        .then(blognew => res.json(blognew.dislikes))
        .catch(err =>
            res.status(400).json({ error: err.message })
        );
})

router.get('/get-comments/:blogId', async (req, res) => {
    try {
        const items = await Comment.find({ blogId: req.params.blogId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.post('/post-comment/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const {commentContent} = req.body; 
    // console.log(blogId);
    // console.log(commentContent);
    const comment = new Comment({
        blogId : blogId,
        text : commentContent,
        username : 'mohit'
    }); 
    // console.log(comment); 
    try {
        const savedItem = await comment.save();
        res.json(savedItem);
      } catch (err) {
        res.json({ message: err });
      }
    // res.send(`Blog ID: ${blogId}`);
})


module.exports = router;