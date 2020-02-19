const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

//Gets categories entered by a user
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user });
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/categories
// @desc    Post a category to DB associated with authorized user
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Must add a name')
        .not()
        .isEmpty(),
      check('name', 'Category must be at least one character').isLength({
        min: 1
      }),
      check('name', 'Category cannot exceed 20 characters').isLength({
        max: 20
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name } = req.body;

      let adjustedCat = adjustCategory(name);
      let foundCat = await Category.findOne({
        name: adjustedCat,
        user: req.user
      });
      if (foundCat) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists' }] });
      }

      let catToAdd = new Category({
        name: adjustedCat,
        user: req.user
      });

      await catToAdd.save();

      res.status(201).json(catToAdd);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route   DELETE api/categories/:id
// @desc    Delete selected one of authorized users associated categories
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: 'Category not found' });

    // Makes sure user owns category
    if (category.user.toString() !== req.user.toString()) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Category.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Category Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Ensures category entry is capitalized
const adjustCategory = cat => {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

module.exports = router;
