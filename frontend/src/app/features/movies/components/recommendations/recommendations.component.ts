import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  type: string = '';
  userFavorites: string[] = [];

  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userFavorites = user.favorites?.map((f: any) => f._id || f) || [];
      }
    });
    this.movieService.getRecommendations().subscribe({
      next: (res) => {
        this.recommendations = res.data;
        this.type = res.type;
      }
    });
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
