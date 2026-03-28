import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  searchQuery = '';
  userFavorites: string[] = [];

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userFavorites = user.favorites?.map((f: any) => f._id || f) || [];
      }
    });
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService.getMovies(this.searchQuery).subscribe({
      next: (res) => this.movies = res.data
    });
  }

  onSearch() {
    this.fetchMovies();
  }

  checkFavorite(movieId: string): boolean {
    return this.userFavorites.includes(movieId);
  }

  toggleFavorite(movieId: string) {
    this.movieService.toggleFavorite(movieId).subscribe({
      next: () => {
        if (this.checkFavorite(movieId)) {
          this.userFavorites = this.userFavorites.filter(id => id !== movieId);
        } else {
          this.userFavorites.push(movieId);
        }
      }
    });
  }
}
