import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      'https://localhost:7076/api/login/login',
      { username, password },
      { responseType: 'text' }
    );
  }
}
