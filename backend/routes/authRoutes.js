const express = require('express');
const { 
  register, 
  login, 
  getMe, 
  addProfile, 
  deleteProfile, 
  toggleMyList,
  updateContinueWatching
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/profiles', protect, addProfile);
router.delete('/profiles/:id', protect, deleteProfile);
router.post('/profiles/:id/list', protect, toggleMyList);
router.post('/profiles/:id/continue', protect, updateContinueWatching);

module.exports = router;
