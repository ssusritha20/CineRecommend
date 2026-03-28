import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService, Profile } from '../../../core/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user$ = this.authService.currentUser$;
  activeProfile$ = this.profileService.activeProfile$;
  searchQuery = '';
  showProfileMenu = false;

  constructor(
    public authService: AuthService, 
    private profileService: ProfileService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/movies'], { queryParams: { search: this.searchQuery } });
    }
  }

  switchProfile() {
    this.router.navigate(['/user/profiles']);
  }

  logout() {
    this.authService.logout();
  }
}
