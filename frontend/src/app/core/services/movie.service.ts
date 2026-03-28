import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(search = ''): Observable<any> {
    const url = search ? `${this.apiUrl}?search=${search}` : this.apiUrl;
    return this.http.get(url);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  toggleFavorite(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/favorite`, {});
  }

  getRecommendations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommendations/me`);
  }

  getSimilarMovies(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/similar`);
  }
}
