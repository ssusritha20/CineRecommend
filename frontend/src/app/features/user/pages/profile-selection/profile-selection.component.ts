import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ProfileService, Profile } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.css']
})
export class ProfileSelectionComponent implements OnInit {
  profiles: Profile[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.profiles = user.profiles;
        this.loading = false;
      }
    });
  }

  selectProfile(profile: Profile) {
    this.profileService.selectProfile(profile);
    this.router.navigate(['/']);
  }

  manageProfiles() {
    // Optional: Implement profile management (add/delete/edit)
    console.log('Manage profiles clicked');
  }
}
