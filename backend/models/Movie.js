const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  contentType: {
    type: String,
    enum: ['movie', 'tv-show'],
    default: 'movie'
  },
  genres: {
    type: [String],
    required: [true, 'Please add at least one genre']
  },
  language: {
    type: String,
    required: [true, 'Please add a language'],
    default: 'English'
  },
  releaseYear: {
    type: Number
  },
  director: {
    type: String
  },
  posterUrl: {
    type: String
  },
  bannerUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);
