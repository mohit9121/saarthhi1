const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const nodemailer = require('nodemailer');


// User Model
const User = require("../../models/User");
const Item = require("../../models/Item");

// Register
router.post("/register", async (req, res) => {
  try {
    let { email, username, password } = req.body;
    console.log(req.body);

    // Check if all fields are filled

    if (!email || !username || !password) {
      return res.status(400).json({ msg: "Please fill in all fields " });
    }

    // Check if passwords match

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      email,
      username,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    // Save user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign({ id: user._id }, "1234567");
    res.json({

      id: user._id,
      email: user.email,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

router.post("/add-item", async (req, res) => {
  const { userId, itemData } = req.body;
  // console.log(userId);
  const item = new Item({
    userId: userId,
    sellerName: itemData.sellerName,
    itemName: itemData.itemName,
    district: itemData.district,
    village: itemData.village,
    quantity: itemData.quantity,
    category: itemData.category,
    description: itemData.description,
    price: itemData.price,
    deliverable: false,
    links: "na",
    maxQuantity: "na"
  });

  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});


router.post("/send-email", async (req, res) =>{
  const { name, email, message } = req.body;
  console.log("hello ji 1");
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: 'saarthithefriendoffarmers@gmail.com',
      pass: 'Saarthi123@$',
    },
  });
 
  const mailOptions = {
    from: email,
    to: 'vyasm912152@gmail.com',
    subject: 'Form Submission',
    text: message,
  };
 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to send email');
    } else { 
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
})



module.exports = router;
