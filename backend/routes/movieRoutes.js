const express = require('express');
const { 
  getMovies, 
  getMovie, 
  addMovie, 
  toggleFavorite, 
  getRecommendations,
  getSimilarMovies
} = require('../controllers/movieController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMovies)
  .post(protect, addMovie);

router.route('/recommendations/me')
  .get(protect, getRecommendations);

router.route('/:id')
  .get(getMovie);

router.route('/:id/similar')
  .get(getSimilarMovies);

router.route('/:id/favorite')
  .post(protect, toggleFavorite);

module.exports = router;
