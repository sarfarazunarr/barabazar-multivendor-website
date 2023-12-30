const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const vendor = require("../Models/vendorModel");
const shortid = require('shortid')
const Order = require("../Models/orderModel");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Payment = require('../Models/paymentModel')
const auth = require("../Middleware/auth");

const JWT_SECRET = process.env.SECRET_KEY;

// Signup New User
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      account_type: "customer",
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.status(400).send("User not found");
    } else {
      bcrpyt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "24h",
          });
          res.status(200).json(token);
        } else {
          res.status(401).send("Invalid credentials");
        }
      });
    }
  });
});

// Get User Data
router.get("/getData", auth, (req, res) => {
  User.findById(req.user._id).then((user) => {
    res.send(user);
  });
});

router.get('/user/:id', auth, async (req, res) => {
  try {
    const userId = req.params.id;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/neworder', auth, async (req, res) => {
  try {
    const { vendor, product, productName, quantity, address, paymentType, totalAmount } = req.body;

    // Generate a unique order number using shortid
    const orderNumber = shortid.generate();

    const order = new Order({
      orderNumber,
      user: req.user._id,
      vendor,
      product,
      productName,
      quantity,
      address,
      paymentType,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(200).json({ savedOrder });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/orders', auth, async (req, res) => {
  try {
    // Get orders for the authenticated user
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for the user' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/followvendor/:vendorId', auth, async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Check if the user is already a follower
    const vendors = await vendor.findById(vendorId);
    const isFollowing = vendors.followers.includes(req.user._id);

    let updatedVendor;

    if (isFollowing) {
      // If already following, remove the user from followers
      updatedVendor = await vendor.findByIdAndUpdate(
        vendorId,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
    } else {
      // If not following, add the user to followers
      updatedVendor = await vendor.findByIdAndUpdate(
        vendorId,
        { $addToSet: { followers: req.user._id } },
        { new: true }
      );
    }

    res.status(200).json({ vendor: updatedVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/followedstores', auth, async (req, res) => {
  try {
    // Find stores where req.user._id is in followers
    const followed = await vendor.find({ followers: req.user._id });

    res.status(200).json({ followed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/verifypayment', auth, async (req, res) => {
  try {

    const {payment_channel, referenceNumber, amount, date, ordernumber} = req.body;

    const checkorder = Order.find({orderNumber : ordernumber});
    if(!checkorder) {
      res.status(404).json({message : 'No Order Found '})
    }
    const newPayment = new Payment({
      user: req.user._id,
      payment_channel,
      referenceNumber,
      amount,
      date,
      ordernumber
    })
    await newPayment.save()
    res.status(200).json({ message: 'Payment Details Sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/cancelorder/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: 'Cancelled' },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
