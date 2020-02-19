const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// @route   GET api/users
// @desc    Get authenticated user (login)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user, 'email name picture');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/users/stats
// @desc    Get authenticated user stats for profile stats area
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const getPopularity = await Entry.aggregate([
      {
        $match: { user: ObjectId(`${req.user}`) }
      },
      {
        $group: {
          _id: '$category',
          hours: { $sum: '$timeSpent.hours' },
          minutes: { $sum: '$timeSpent.minutes' }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const popularityArr = getPopularity.map(category => {
      category.hours += category.minutes / 60;
      return { [category._id]: category.hours };
    });

    const sortPopularity = (a, b) => {
      const categoryA = Object.values(a)[0];
      const categoryB = Object.values(b)[0];

      let comparison = 0;
      if (categoryA > categoryB) {
        comparison = 1;
      } else if (categoryA < categoryB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    const sortedPopularity = popularityArr.sort(sortPopularity);

    const totalTime = await Entry.aggregate([
      {
        $match: { user: ObjectId(`${req.user}`) }
      },
      {
        $group: {
          _id: '',
          hours: { $sum: '$timeSpent.hours' },
          minutes: { $sum: '$timeSpent.minutes' }
        }
      },
      {
        $project: {
          _id: 0,
          hours: 1,
          minutes: 1
        }
      }
    ]);

    while (totalTime[0].minutes > 60) {
      totalTime[0].minutes -= 60;
      totalTime[0].hours += 1;
    }

    const avgRating = await Entry.aggregate([
      {
        $match: { user: ObjectId(`${req.user}`) }
      },
      {
        $group: {
          _id: '',
          avg: { $avg: '$rating' }
        }
      }
    ]);

    const count = await Entry.aggregate([
      {
        $match: { user: ObjectId(`${req.user}`) }
      },
      {
        $count: 'userEntries'
      }
    ]);

    res.json({ sortedPopularity, totalTime, avgRating, count });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
