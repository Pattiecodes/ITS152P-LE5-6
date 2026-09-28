import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
})
export class RegisterPage implements OnInit {
  form = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  };

  constructor(
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password, firstName, lastName } = this.form;

    console.log(this.form);

    this.http
      .post('https://localhost:7076/api/login/register', this.form, {
        responseType: 'text',
      })
      .subscribe(() => {
        this.route.navigate(['/login']);
      });
  }
}
