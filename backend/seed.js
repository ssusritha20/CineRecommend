const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');

dotenv.config();

const movies = [
  // HOLLYWOOD / ENGLISH MOVIES
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    contentType: 'movie',
    releaseYear: 2010,
    director: 'Christopher Nolan',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/s3TBrRGB1invgHHz1zaR1.jpg',
    videoUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    averageRating: 8.8
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...',
    genres: ['Action', 'Crime', 'Drama'],
    language: 'English',
    contentType: 'movie',
    releaseYear: 2008,
    director: 'Christopher Nolan',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    videoUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    averageRating: 9.0
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space...',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'English',
    contentType: 'movie',
    releaseYear: 2014,
    director: 'Christopher Nolan',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeVD85aPN8H21k.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/xJHokMbljvjEVAql3tfM8qpxRv.jpg',
    videoUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    averageRating: 8.6
  },
  {
    title: 'Oppenheimer',
    description: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb.',
    genres: ['Biography', 'Drama', 'History'],
    language: 'English',
    contentType: 'movie',
    releaseYear: 2023,
    director: 'Christopher Nolan',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv2mYgiFAjzkpPdyq1pI9S1oO.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/fm6Ns0Ycy02BIBy6IUXDIqb0vY.jpg',
    videoUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    averageRating: 8.4
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
    genres: ['Action', 'Sci-Fi'],
    language: 'English',
    contentType: 'movie',
    releaseYear: 1999,
    director: 'Lana Wachowski',
    posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3Y9SJuCYFJjbbG7Y3XY9D4W.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/8W9pU_O2SZu0Xy8p6E0Xf_O9W4Y.jpg',
    videoUrl: 'https://www.youtube.com/embed/m8e-FF8MsqU',
    averageRating: 8.7
  },

  // HINDI MOVIES
  {
    title: 'Dangal',
    description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory...',
    genres: ['Action', 'Biography', 'Drama'],
    language: 'Hindi',
    contentType: 'movie',
    releaseYear: 2016,
    director: 'Nitesh Tiwari',
    posterUrl: 'https://image.tmdb.org/t/p/w500/mXZ9Y8XreGf9vK61C7pGv9XlqO.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/w2uGvCpMtvRqZgXN2wK1Q1Yq2P4.jpg',
    videoUrl: 'https://www.youtube.com/embed/x_7YlGv9u1g',
    averageRating: 8.4
  },
  {
    title: '3 Idiots',
    description: 'Two friends are searching for their long lost companion...',
    genres: ['Comedy', 'Drama'],
    language: 'Hindi',
    contentType: 'movie',
    releaseYear: 2009,
    director: 'Rajkumar Hirani',
    posterUrl: 'https://image.tmdb.org/t/p/w500/6679YlGv9u1gX7YlGv9u1g.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/oXlqO2wK1Q1Yq2P4.jpg',
    videoUrl: 'https://www.youtube.com/embed/K0eDlFX9Gmc',
    averageRating: 8.4
  },
  {
    title: 'Gangs of Wasseypur',
    description: 'A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur...',
    genres: ['Action', 'Comedy', 'Crime'],
    language: 'Hindi',
    contentType: 'movie',
    releaseYear: 2012,
    director: 'Anurag Kashyap',
    posterUrl: 'https://image.tmdb.org/t/p/w500/x_7YlGv9u1g.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/w2uGvCpMtvRqZgXN2wK1Q1Yq2P4.jpg',
    videoUrl: 'https://www.youtube.com/embed/j-AkV344I8w',
    averageRating: 8.2
  },

  // TELUGU MOVIES
  {
    title: 'RRR',
    description: 'A fictitious story about two legendary revolutionaries...',
    genres: ['Action', 'Drama'],
    language: 'Telugu',
    contentType: 'movie',
    releaseYear: 2022,
    director: 'S.S. Rajamouli',
    posterUrl: 'https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgHO.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/b0PlSFdSmKmR689JMT2b8tE2HGE.jpg',
    videoUrl: 'https://www.youtube.com/embed/NgBoMJy386M',
    averageRating: 7.9
  },
  {
    title: 'Baahubali: The Beginning',
    description: 'A child from the Mahishmati kingdom is raised by tribal people...',
    genres: ['Action', 'Drama', 'Fantasy'],
    language: 'Telugu',
    contentType: 'movie',
    releaseYear: 2015,
    director: 'S.S. Rajamouli',
    posterUrl: 'https://image.tmdb.org/t/p/w500/96620.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/96620.jpg',
    videoUrl: 'https://www.youtube.com/embed/sOEg_YZQsTI',
    averageRating: 8.0
  },
  {
    title: 'Pushpa: The Rise',
    description: 'A laborer rises through the ranks of a red sandal smuggling syndicate...',
    genres: ['Action', 'Crime', 'Drama'],
    language: 'Telugu',
    contentType: 'movie',
    releaseYear: 2021,
    director: 'Sukumar',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8pD66S50yUqz74kAsS6v1V4r86j.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/ojTqYfFmU8s1y6F0mY6.jpg',
    videoUrl: 'https://www.youtube.com/embed/Q1NKMPhP8PY',
    averageRating: 7.6
  },

  // TV SHOWS
  {
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher turned methamphetamine producer...',
    genres: ['Crime', 'Drama', 'Thriller'],
    language: 'English',
    contentType: 'tv-show',
    releaseYear: 2008,
    director: 'Vince Gilligan',
    posterUrl: 'https://image.tmdb.org/t/p/w500/ggm8bb1S96620.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/ggm8bb1S96620.jpg',
    videoUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    averageRating: 9.5
  },
  {
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces...',
    genres: ['Drama', 'Fantasy', 'Horror'],
    language: 'English',
    contentType: 'tv-show',
    releaseYear: 2016,
    director: 'The Duffer Brothers',
    posterUrl: 'https://image.tmdb.org/t/p/w500/49W0L-Stranger-Things.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/49W0L-Stranger-Things.jpg',
    videoUrl: 'https://www.youtube.com/embed/b9EkMc79ZSU',
    averageRating: 8.7
  },
  {
    title: 'Squid Game',
    description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games...',
    genres: ['Action', 'Drama', 'Mystery'],
    language: 'Korean',
    contentType: 'tv-show',
    releaseYear: 2021,
    director: 'Hwang Dong-hyuk',
    posterUrl: 'https://image.tmdb.org/t/p/w500/d96620-Squid-Game.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/d96620-Squid-Game.jpg',
    videoUrl: 'https://www.youtube.com/embed/oqxAJKy0ii4',
    averageRating: 8.1
  },
  {
    title: 'Dark',
    description: 'A family saga with a supernatural twist, set in a German town...',
    genres: ['Crime', 'Drama', 'Mystery'],
    language: 'German',
    contentType: 'tv-show',
    releaseYear: 2017,
    director: 'Baran bo Odar',
    posterUrl: 'https://image.tmdb.org/t/p/w500/ap6620-Dark.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/ap6620-Dark.jpg',
    videoUrl: 'https://www.youtube.com/embed/rrwycJ08PSA',
    averageRating: 8.8
  },
  {
    title: 'Money Heist',
    description: 'An unusual group of robbers attempt to carry out the most perfect heist in Spanish history...',
    genres: ['Action', 'Crime', 'Drama'],
    language: 'Spanish',
    contentType: 'tv-show',
    releaseYear: 2017,
    director: 'Álex Pina',
    posterUrl: 'https://image.tmdb.org/t/p/w500/re6620-Money-Heist.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/re6620-Money-Heist.jpg',
    videoUrl: 'https://www.youtube.com/embed/_InqQJRqGW4',
    averageRating: 8.2
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  await Movie.deleteMany({}); 
  await Movie.insertMany(movies);
  console.log(`Database Seeded Successfully! Added ${movies.length} multilingual Netflix content entries (Movies & TV Shows).`);
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
