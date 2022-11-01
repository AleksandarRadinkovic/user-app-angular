import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      validators: this.controlValuesAreEqual('password', 'confirmPassword')
    
    });
  }
  get passwordMatchError() {
    return (
        this.signupForm.getError('valuesDoNotMatch') &&
        this.signupForm.get('confirmPassword')?.touched
    );
  }
  private controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const valueOfControlA = formGroup.get(controlNameA)?.value
      const valueOfControlB = formGroup.get(controlNameB)?.value

      if (valueOfControlA === valueOfControlB) {
        return null
      } else {
        return { valuesDoNotMatch: true }
      }


    }
  }
  signUp() {
    this.http
      .post<any>('http://localhost:3000/signupUsers', this.signupForm.value)
      .subscribe({
        next: (res) => {
          this.signupForm.reset(), this.router.navigate(['login']);
        },
        error: (e) => alert('Something went wrong'),
      });
  }
}
