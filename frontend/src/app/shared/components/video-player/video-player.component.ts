import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoId: string = '';
  @Input() videoUrl: string = '';
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  safeUrl: SafeResourceUrl | null = null;
  brightness = 100;
  volume = 100;
  progress = 0; 
  selectedSubtitle = 'Off';
  subtitles = ['Off', 'English', 'Hindi', 'Telugu', 'Spanish', 'French'];
  isPlaying = true;
  showControls = true;
  controlsTimeout: any;

  constructor(
    private sanitizer: DomSanitizer, 
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    // Resume from last position if available (otherwise start from 0)
    const profile = this.profileService.activeProfileValue;
    if (profile && this.videoId) {
      const continueItem = profile.continueWatching.find((i: any) => i.movie._id === this.videoId || i.movie === this.videoId);
      if (continueItem) {
        this.progress = continueItem.progress;
      }
    }

    if (this.videoUrl) {
      const embedUrl = this.videoUrl.includes('embed') ? this.videoUrl : this.convertToEmbed(this.videoUrl);
      const timeParam = this.progress > 0 ? `&start=${Math.floor(this.progress * 180 / 100)}` : ''; // Mocked duration as 180s for demo
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl + `?autoplay=1&controls=0&modestbranding=1&rel=0${timeParam}`);
    }
    this.resetControlsTimeout();
  }

  private convertToEmbed(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  onMouseMove() {
    this.showControls = true;
    this.resetControlsTimeout();
  }

  resetControlsTimeout() {
    if (this.controlsTimeout) clearTimeout(this.controlsTimeout);
    this.controlsTimeout = setTimeout(() => {
        this.showControls = false;
    }, 3000);
  }

  saveProgress() {
    const profile = this.profileService.activeProfileValue;
    if (profile && this.videoId) {
      this.profileService.updateContinueWatching(profile._id, this.videoId, this.progress).subscribe();
    }
  }

  goBack() {
    this.saveProgress();
    this.close.emit();
  }

  increaseVolume() {
    if (this.volume < 100) this.volume += 10;
  }

  reduceVolume() {
    if (this.volume > 0) this.volume -= 10;
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    // In a real app, this would message the iframe or use the YT API
  }

  skip(seconds: number) {
    // Mocking skip logic for progression bar
    const skipPercent = (seconds / 180) * 100; // Mocked 3 min movie
    this.progress = Math.min(Math.max(0, this.progress + skipPercent), 100);
  }

  increaseBrightness() {
    if (this.brightness < 150) this.brightness += 10;
  }

  reduceBrightness() {
    if (this.brightness > 50) this.brightness -= 10;
  }
}
