import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieRowComponent } from './components/movie-row/movie-row.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MovieCardComponent,
    MovieRowComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoaderComponent
  ],
  exports: [
    NavbarComponent,
    MovieCardComponent,
    MovieRowComponent,
    VideoPlayerComponent,
    LoaderComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
