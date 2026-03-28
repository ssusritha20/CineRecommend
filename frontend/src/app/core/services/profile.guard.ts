import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const activeProfile = this.profileService.activeProfileValue;
    if (activeProfile) {
      return true;
    }

    // No profile selected, redirect to profile selection
    this.router.navigate(['/user/profiles']);
    return false;
  }
}
