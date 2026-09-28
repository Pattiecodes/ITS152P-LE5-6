import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth';
import { TokenStorage } from '../../services/token-storage';

@Component({
  imports: [FormsModule],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage implements OnInit {
  form = {
    username: null,
    password: null,
  };

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl || '/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.http
      .post('https://localhost:7076/api/login/login', {
        username,
        password,
      }, { responseType: 'text' })
      .subscribe({
        next: (token: string) => {
          this.tokenStorage.saveToken(token);
          this.authService.isLoggedIn = true;
          this.router.navigate([this.authService.redirectUrl || '/']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
  }
}
