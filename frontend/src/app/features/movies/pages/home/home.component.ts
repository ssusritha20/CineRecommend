import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ProfileService, Profile } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  allMovies: any[] = [];
  featuredMovie: any = null;
  
  myListMovies: any[] = [];
  continueWatchingMovies: any[] = [];
  trendingMovies: any[] = [];
  actionMovies: any[] = [];
  sciFiMovies: any[] = [];
  hindiMovies: any[] = [];
  teluguMovies: any[] = [];
  koreanMovies: any[] = [];
  japaneseMovies: any[] = [];
   tamilMovies: any[] = [];
  personalizedMovies: any[] = [];
  
  userFavorites: string[] = [];
  activeProfile: Profile | null = null;
  authSub!: Subscription;
  profileSub!: Subscription;

  constructor(
    private movieService: MovieService, 
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      // User context
    });

    this.profileSub = this.profileService.activeProfile$.subscribe(profile => {
      this.activeProfile = profile;
      if (profile) {
        this.userFavorites = profile.myList?.map((m: any) => m._id || m) || [];
        this.myListMovies = profile.myList || [];
        this.continueWatchingMovies = profile.continueWatching?.map((cw: any) => {
            const movie = cw.movie?._id ? cw.movie : this.allMovies.find(m => m._id === cw.movie);
            return { ...movie, progress: cw.progress };
        }).filter(m => m.title) || [];
        this.categorizeMovies();
      }
    });

    this.movieService.getMovies('').subscribe(res => {
      this.allMovies = res.data;
      this.categorizeMovies();
    });
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.profileSub) this.profileSub.unsubscribe();
  }
  categorizeMovies() {
    if (this.allMovies.length === 0) return;

    this.trendingMovies = [...this.allMovies].sort((a, b) => b.averageRating - a.averageRating).slice(0, 10);
    
    this.actionMovies = this.allMovies.filter(m => m.genres?.includes('Action'));
    this.sciFiMovies = this.allMovies.filter(m => m.genres?.includes('Sci-Fi') || m.genres?.includes('Animation'));

    this.hindiMovies = this.allMovies.filter(m => m.language === 'Hindi');
    this.teluguMovies = this.allMovies.filter(m => m.language === 'Telugu');
    this.koreanMovies = this.allMovies.filter(m => m.language === 'Korean');
    this.japaneseMovies = this.allMovies.filter(m => m.language === 'Japanese');
    this.tamilMovies = this.allMovies.filter(m => m.language === 'Tamil');

    // Personalized: Top Picks based on genres the user has in My List
    if (this.activeProfile && this.userFavorites.length > 0) {
      const favMovie = this.myListMovies[0];
      const genres = favMovie?.genres || [];
      this.personalizedMovies = this.allMovies
        .filter(m => genres.some((g: string) => m.genres?.includes(g)) && !this.userFavorites.includes(m._id))
        .slice(0, 10);
    }

    // Dynamic Hero: Last Watched or Trending
    if (this.continueWatchingMovies.length > 0) {
      this.featuredMovie = this.continueWatchingMovies[0];
    } else {
      const bannerMovies = this.allMovies.filter(m => m.bannerUrl);
      this.featuredMovie = bannerMovies.length > 0 ? bannerMovies[Math.floor(Math.random() * bannerMovies.length)] : this.allMovies[0];
    }
  }

  onToggleFavorite(movieId: string) {
    if (!this.activeProfile) return;
    
    this.profileService.toggleMyList(this.activeProfile._id, movieId).subscribe();
  }
}
