import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface Profile {
  _id: string;
  name: string;
  avatar: string;
  isLocked: boolean;
  pin?: string;
  myList: any[];
  continueWatching: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/auth/profiles';
  private activeProfileSubject = new BehaviorSubject<Profile | null>(null);
  public activeProfile$ = this.activeProfileSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedProfile = localStorage.getItem('activeProfile');
    if (savedProfile) {
      this.activeProfileSubject.next(JSON.parse(savedProfile));
    }
  }

  get activeProfileValue(): Profile | null {
    return this.activeProfileSubject.value;
  }

  selectProfile(profile: Profile) {
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    this.activeProfileSubject.next(profile);
  }

  clearProfile() {
    localStorage.removeItem('activeProfile');
    this.activeProfileSubject.next(null);
  }

  addProfile(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl, profileData);
  }

  deleteProfile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  toggleMyList(profileId: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${profileId}/list`, { movieId }).pipe(
      tap((res: any) => {
        const active = this.activeProfileValue;
        if (active && active._id === profileId) {
          active.myList = res.data;
          this.selectProfile(active);
        }
      })
    );
  }

  updateContinueWatching(profileId: string, movieId: string, progress: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${profileId}/continue`, { movieId, progress }).pipe(
      tap((res: any) => {
        const active = this.activeProfileValue;
        if (active && active._id === profileId) {
          active.continueWatching = res.data;
          this.selectProfile(active);
        }
      })
    );
  }
}
