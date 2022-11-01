import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.checkLogin();
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe({
      next: (res) => {
        const user = res.find((r: any) => {
          return (
            r.email === this.loginForm.value.email &&
            r.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login success');
          localStorage.setItem('user-info', JSON.stringify(user));
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          alert('Something went wrong');
        }
      },
      error: (e) => alert('Something went wrong'),
    });
  }
  checkLogin() {
    let checkLogin = localStorage.getItem('user-info');
    if (!checkLogin) {
      this.router.navigate(['login']);
    }
  }
}
