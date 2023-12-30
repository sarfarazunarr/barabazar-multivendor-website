const express = require('express');
const router = express.Router();
const product = require('../Models/productModel');
const vendor = require('../Models/vendorModel')


router.get('/allproducts', async (req, res) => {
  const products = await product.find({})
  res.status(200).json(products);
});

router.get('/allvendors', async (req, res) => {
  const vendors = await vendor.find({})
  res.status(200).json({ vendors });
});
router.get('/vendor/:id', async (req, res) => {
  const vendors = await vendor.find({ slug: req.params.id })
  res.status(200).json({ vendors });
});
router.get('/vendorcategory/:id',  async (req, res) => {
  const products = await product.find({ user: req.params.id })
  res.status(200).json({ products });
});

router.get('/categoryposts/:category', async (req, res) => {
  const posts = await blog.find({ category: req.params.category });
  res.status(201).json(posts);
});

router.get('/tagsposts/:tag', async (req, res) => {
  const posts = await blog.find({ tags: req.params.tag });
  res.status(201).json(posts);
});

router.get('/searchproducts/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const products = await product.find({ $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { description: { $regex: searchTerm, $options: 'i' } }] });
  res.status(200).json(products);
});
router.get('/allproducts/:category', async (req, res) => {
  try {
    const products = await product.find({ productcategory: req.params.category });
    if (!products || products.length === 0) {
      res.status(404).json('No Category Found')
    }
    else {
      res.status(200).json(products)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/product/:id', async (req, res) => {
  try {
    const result = await product.find({ slug: req.params.id });

    if (!result || result.length === 0) {
      res.status(404).json({ error: 'No Product found' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
