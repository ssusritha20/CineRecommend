import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { Subscription } from 'rxjs';
import { ProfileService, Profile } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: any;
  similarMovies: any[] = [];
  userFavorites: string[] = [];
  isPlaying: boolean = false;
  activeProfile: Profile | null = null;
  private profileSub!: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileSub = this.profileService.activeProfile$.subscribe(profile => {
      this.activeProfile = profile;
      if (profile) {
        this.userFavorites = profile.myList?.map((m: any) => m._id || m) || [];
      } else {
        this.userFavorites = [];
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMovie(id);
      }
    });
  }

  ngOnDestroy() {
    if (this.profileSub) this.profileSub.unsubscribe();
  }

  loadMovie(id: string) {
    this.movieService.getMovie(id).subscribe({
      next: (res: any) => {
         this.movie = res.data;
         this.isPlaying = false;
         this.loadSimilarMovies(id);
         window.scrollTo(0, 0);
      }
    });
  }

  playMovie() {
    if (this.movie && this.movie.videoUrl) {
      this.isPlaying = true;
    }
  }

  stopMovie() {
    this.isPlaying = false;
  }

  loadSimilarMovies(id: string) {
    this.movieService.getSimilarMovies(id).subscribe({
      next: (res: any) => {
        this.similarMovies = res.data;
      }
    });
  }

  checkFavorite(movieId: string): boolean {
    return this.userFavorites.includes(movieId);
  }

  toggleFavorite(movieId: string) {
    if (!this.activeProfile) return;
    
    this.profileService.toggleMyList(this.activeProfile._id, movieId).subscribe();
  }
}
