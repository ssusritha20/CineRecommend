import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

@NgModule({
  declarations: [
    HomeComponent,
    MoviePageComponent,
    MovieListComponent,
    MovieDetailComponent,
    RecommendationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MoviesRoutingModule,
    SharedModule
  ]
})
export class MoviesModule { }
