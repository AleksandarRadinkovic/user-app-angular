import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
login(){
  this.http.get<any>("http://localhost:3000/signupUsers")
  .subscribe({ 
    next: (res) => 
    {const user = res.find((r:any)=>
      {
        return r.email === this.loginForm.value.email && r.password === this.loginForm.value.password;
      });
    if(user){
      alert("Login success");
      localStorage.setItem("user-info", JSON.stringify(user));
      this.loginForm.reset();
      this.router.navigate(['dashboard'])}
    },
    error: (e) => 
    alert("Something went wrong") })
}
}
