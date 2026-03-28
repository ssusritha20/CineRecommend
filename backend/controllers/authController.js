const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  res.status(statusCode).json({
    success: true,
    token
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create user with a default profile
    const user = await User.create({
      username,
      email,
      password,
      profiles: [{
        name: 'Main',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CineBlue'
      }]
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('profiles.myList')
      .populate('profiles.continueWatching.movie');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add a profile
// @route   POST /api/auth/profiles
// @access  Private
exports.addProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user.profiles.length >= 5) {
      return res.status(400).json({ success: false, error: 'Maximum 5 profiles allowed' });
    }

    user.profiles.push(req.body);
    await user.save();

    res.status(200).json({ success: true, data: user.profiles });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete a profile
// @route   DELETE /api/auth/profiles/:id
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profiles = user.profiles.filter(p => p._id.toString() !== req.params.id);
    await user.save();
    res.status(200).json({ success: true, data: user.profiles });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Toggle movie in profile My List
// @route   POST /api/auth/profiles/:id/list
// @access  Private
exports.toggleMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = user.profiles.id(req.params.id);
    const { movieId } = req.body;

    const index = profile.myList.indexOf(movieId);
    if (index > -1) {
      profile.myList.splice(index, 1);
    } else {
      profile.myList.push(movieId);
    }

    await user.save();
    res.status(200).json({ success: true, data: profile.myList });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update movie progress in profile continueWatching
// @route   POST /api/auth/profiles/:id/continue
// @access  Private
exports.updateContinueWatching = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = user.profiles.id(req.params.id);
    const { movieId, progress } = req.body;

    // Check if movie already in list
    let item = profile.continueWatching.find(i => i.movie.toString() === movieId);
    
    if (item) {
        item.progress = progress;
        item.lastWatched = Date.now();
    } else {
        profile.continueWatching.unshift({ movie: movieId, progress });
    }

    // Keep only last 10
    if (profile.continueWatching.length > 10) {
        profile.continueWatching = profile.continueWatching.slice(0, 10);
    }

    await user.save();
    res.status(200).json({ success: true, data: profile.continueWatching });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
