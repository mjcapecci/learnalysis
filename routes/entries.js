const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Category = require('../models/Category');
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

// @route   GET api/entries/:page/:results
// @desc    Get selected entries
// @access  Private
router.get('/:page/:results', auth, async (req, res) => {
  const pageStr = req.params.page;
  const resultsStr = req.params.results;
  const page = parseInt(pageStr);
  const results = parseInt(resultsStr);

  if (results <= 0 || results > 100) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Specified quantity is invalid' }] });
  }

  let options = {
    skip: (page - 1) * results,
    limit: results,
    sort: { _id: -1 }
  };

  const query = Entry.find({ user: req.user }, null, options);
  const result = await query.exec();
  res.status(200).json(result);
});

// @route   GET api/entries/search/:query/:page/:results
// @desc    Get entries that meet search parameters
// @access  Private
router.get('/search/:query/:page/:results', auth, async (req, res) => {
  const pageStr = req.params.page;
  const resultsStr = req.params.results;
  const query = req.params.query;
  const page = parseInt(pageStr);
  const results = parseInt(resultsStr);

  let r = new RegExp(query, 'i');

  let options = {
    skip: (page - 1) * results,
    limit: results,
    sort: { _id: -1 }
  };

  try {
    Entry.ensureIndexes({
      category: 'text',
      summary: 'text',
      description: 'text'
    });

    const db_query = await Entry.find(
      {
        $and: [
          { user: req.user },
          {
            $or: [
              { category: { $regex: r } },
              { summary: { $regex: r } },
              { description: { $regex: r } }
            ]
          }
        ]
      },
      null,
      options
    );

    // This provides a raw count for the front end to provide accurate pagination information
    const query_count = await Entry.find(
      {
        $and: [
          { user: req.user },
          {
            $or: [
              { category: { $regex: r } },
              { summary: { $regex: r } },
              { description: { $regex: r } }
            ]
          }
        ]
      },
      null
    ).countDocuments();

    const result = db_query;
    const count = query_count;
    res.status(200).json({ result, count });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/entries
// @desc    Add entry
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('summary', 'Must enter a summary').not().isEmpty(),
      check('summary', 'Invalid input').isString().trim().stripLow().escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      date,
      editDate,
      category,
      medium,
      timeSpent,
      summary,
      description,
      researchOnly,
      rating
    } = req.body;

    if (!timeSpent.hours) timeSpent.hours = 0;
    if (!timeSpent.minutes) timeSpent.minutes = 0;

    try {
      let foundCat = await Category.findOne({ name: category });
      if (!foundCat) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category is invalid' }] });
      }

      let entry = new Entry({
        date,
        editDate,
        sortDate: Date.now(),
        user: req.user,
        category,
        medium,
        timeSpent,
        summary,
        description,
        researchOnly,
        rating
      });

      await entry.save();

      res.status(201).json(entry);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route   PUT api/entries/:id
// @desc    Update entry
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('summary', 'Must enter a summary').not().isEmpty(),
      check('summary', 'Invalid input').isString().trim().stripLow().escape()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      category,
      editDate,
      medium,
      timeSpent,
      summary,
      description,
      researchOnly,
      rating
    } = req.body;

    if (!timeSpent.hours) timeSpent.hours = 0;
    if (!timeSpent.minutes) timeSpent.minutes = 0;

    try {
      let foundCat = await Category.findOne({ name: category });
      if (!foundCat) {
        return res.status(400).json({ msg: 'Category is invalid' });
      }

      let entry = await Entry.findById(req.params.id);

      if (!entry) return res.status(404).json({ msg: 'Entry not found' });

      // Make sure user owns entry
      if (entry.user.toString() !== req.user.toString()) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      const updEntry = {
        category,
        editDate,
        edited: true,
        medium,
        timeSpent,
        summary,
        description,
        researchOnly,
        rating
      };

      entry = await Entry.findByIdAndUpdate(
        req.params.id,
        { $set: updEntry },
        { new: true }
      );
      res.json(entry);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/entries/:id
// @desc    Delete entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Entry.findByIdAndRemove(req.params.id);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
  res.status(200).send('Success');
});

module.exports = router;
