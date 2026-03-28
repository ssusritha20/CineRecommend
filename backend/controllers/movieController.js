const Movie = require('../models/Movie');
const User = require('../models/User');

// @desc    Get all movies or query by genre/title
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude from normal matching
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    query = Movie.find(JSON.parse(queryStr));

    // Search by title, director, or genres
    if (req.query.search) {
      const searchRegex = { $regex: req.query.search, $options: 'i' };
      query = query.find({
        $or: [
          { title: searchRegex },
          { director: searchRegex },
          { genres: { $in: [new RegExp(req.query.search, 'i')] } }
        ]
      });
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort by newest
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    query = query.skip(startIndex).limit(limit);

    const movies = await query;

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Add a movie
// @route   POST /api/movies
// @access  Private
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Toggle favorite movie for logged-in user
// @route   POST /api/movies/:id/favorite
// @access  Private
exports.toggleFavorite = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    const user = await User.findById(req.user.id);
    
    const isFavorite = user.favorites.includes(movie._id);
    
    if (isFavorite) {
      // Remove from favorites
      user.favorites = user.favorites.filter(favId => favId.toString() !== movie._id.toString());
    } else {
      // Add to favorites
      user.favorites.push(movie._id);
    }
    
    await user.save();

    res.status(200).json({
      success: true,
      isFavorite: !isFavorite,
      message: !isFavorite ? 'Added to favorites' : 'Removed from favorites'
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get recommendations based on genres of favorited movies
// @route   GET /api/movies/recommendations/me
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    
    if (!user.favorites || user.favorites.length === 0) {
      // Return top rated movies if no favorites
      const topMovies = await Movie.find().sort('-averageRating').limit(10);
      return res.status(200).json({ success: true, count: topMovies.length, data: topMovies, type: 'top-rated' });
    }

    // Collect genres from favorites
    const favoriteGenres = new Set();
    user.favorites.forEach(movie => {
      movie.genres.forEach(genre => favoriteGenres.add(genre));
    });

    const genreList = Array.from(favoriteGenres);
    const favoriteIds = user.favorites.map(f => f._id);

    // Find movies with matching genres that aren't already favorited
    const recommendations = await Movie.find({
      _id: { $nin: favoriteIds },
      genres: { $in: genreList }
    }).limit(10).sort('-averageRating');

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      type: 'based-on-favorites'
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get similar movies by genre
// @route   GET /api/movies/:id/similar
// @access  Public
exports.getSimilarMovies = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }
    
    // Find movies sharing at least one genre, excluding the current movie
    const similarMovies = await Movie.find({
      _id: { $ne: movie._id },
      genres: { $in: movie.genres }
    }).limit(8).sort('-averageRating');

    res.status(200).json({
      success: true,
      count: similarMovies.length,
      data: similarMovies
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
