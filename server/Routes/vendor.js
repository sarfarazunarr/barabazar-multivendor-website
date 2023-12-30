const express = require("express");
const router = express.Router();
const vendor = require("../Models/vendorModel");
const product = require("../Models/productModel");
const order = require("../Models/orderModel");
const auth = require("../Middleware/auth");


router.post("/beseller", auth, async (req, res) => {
  const { businessName, businessurl, fburl, address, city, country, zipcode, description, businessCategory } = req.body;

  try {
    // Extract the user ID from req.user
    const userId = req.user._id;

    // Check if a vendor with the same user ID already exists
    const existingVendor = await vendor.findOne({ user: userId });

    if (existingVendor) {
      return res.status(400).json({ message: "A business is already registered with this user ID" });
    }
    const slugs = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); 
    // Create a new vendor with only the user ID
    const newvendor = new vendor({
      user: userId,
      businessName,
      businessurl,
      fburl,
      address,
      city,
      country,
      zipcode,
      description,
      businessCategory,
      slug: slugs
    });

    await newvendor.save();
    res.status(200).json({ message: "Vendor added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/addproduct", auth, async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      productspecification,
      productprice,
      productcategory,
      producttags,
      productimage
    } = req.body;

    // Validate that required fields are provided
    if (!productname || !productprice || !productcategory || !productimage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = new product({
      productname,
      productdescription,
      productprice,
      productimage,
      productcategory,
      productspecification,
      producttags,
      slug: productname.toLowerCase().replace(/ /g, "-"),
      user: req.user._id,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Handle validation errors (e.g., required fields, format)
      return res.status(400).json({ error: error.message });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/allproducts", auth, async (req, res) => {
  try {
    const userid = req.user._id;
    const products = await product.find({ user: userid });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.put("/updateproduct/:productid", auth, async (req, res) => {
  const {
    productname,
    productdescription,
    productprice,
    productimage,
    productcategory,
    productquantity,
    productvendor,
  } = req.body;
  await product.findByIdAndUpdate(req.params.productid, {
    productname: productname,
    productdescription: productdescription,
    productprice: productprice,
    productimage: productimage,
    productcategory: productcategory,
    productquantity: productquantity,
    productvendor: productvendor,
  });
  res.status(200).json({ message: "Product updated successfully" });
});


router.get("/allorder", auth, async (req, res) => {
  try{
    const vendorId = req.user._id;
    const orderdata = await order.find({ vendor: vendorId });
    res.status(200).json({ orderdata });
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put("/orderstatus/:id", auth, async (req, res) => {
  const { status } = req.body;
  await order.findByIdAndUpdate(req.params.id, { status: status });
  res.status(200).json({ message: "Order status updated successfully" });
});

router.get("/order/:id", auth, async (req, res) => {
  try {
    const orderId = req.params.id;

    // Customize the population of related data if needed
    const orderdata = await order.findById(orderId); // Use the imported order model
    if (!orderdata) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ orderdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete("deletevendor/:id", auth, async (req, res) => {
  const vendor = await vendor.findById(req.params.id);
  await vendor.remove();
  res.status(200).json({ message: "Vendor deleted successfully" });
});
module.exports = router;
