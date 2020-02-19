const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// @route   GET api/auth/redirect
// @desc    Provides redirect token for Google OAuth login
// @access  Public
router.get('/redirect', (req, res) => {
  try {
    const url = client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    });
    res.status(200).send(url);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   POST api/auth
// @desc    Returns login token for existing user / saves new user to DB and returns login token
// @access  Public
router.post(
  '/',
  [
    check('code', 'Invalid token')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { code } = req.body;

      const payload = await verify(code);

      let user = await User.findOne({ googleId: payload.sub });

      if (user) {
        user.lastLogin = Date.now();

        await user.save();
      } else {
        user = new User({
          email: payload.email,
          googleId: payload.sub,
          picture: payload.picture,
          name: payload.name
        });

        await user.save();
      }

      const jwtPayload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        jwtPayload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

//Uses authorization code from front end to get basic profile of Google user
async function verify(code) {
  const tokenResponse = await client.getToken(code);

  const tokens = tokenResponse.tokens;

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();

  return payload;
}

module.exports = router;
