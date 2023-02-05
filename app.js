const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const products = require('./routes/api/products');
const blog = require('./routes/api/blog.js');

const app = express(); 
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/products', products);
app.use('/api/blog', blog);
 
const port = process.env.PORT || 8082; 

app.listen(port, () => console.log(`Server running on port ${port}`)); 