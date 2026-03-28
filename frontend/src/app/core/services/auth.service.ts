import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private profileService: ProfileService
  ) {
    this.checkLoginStatus();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.apiUrl}/me`).subscribe({
        next: (res: any) => this.currentUserSubject.next(res.data),
        error: () => this.logout()
      });
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.checkLoginStatus();
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.checkLoginStatus();
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.profileService.clearProfile();
    this.currentUserSubject.next(null);
    this.router.navigate(['/user/login']);
  }
}
