import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-row',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.css']
})
export class MovieRowComponent {
  @Input() title: string = '';
  @Input() movies: any[] = [];
  @Input() userFavorites: string[] = [];
  @Output() favoriteToggle = new EventEmitter<string>();

  checkFavorite(movieId: string): boolean {
    return this.userFavorites.includes(movieId);
  }

  onToggleFavorite(movieId: string) {
    this.favoriteToggle.emit(movieId);
  }

  scrollRight(row: HTMLElement) {
    row.scrollBy({ left: window.innerWidth / 1.5, behavior: 'smooth' });
  }

  scrollLeft(row: HTMLElement) {
    row.scrollBy({ left: -(window.innerWidth / 1.5), behavior: 'smooth' });
  }
}
