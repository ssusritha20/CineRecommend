import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggle = new EventEmitter<string>();

  onToggleFavorite(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteToggle.emit(this.movie._id);
  }
}
