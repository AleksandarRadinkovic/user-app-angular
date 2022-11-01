import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [''],
      name: [''],
      password: [''],
    });
    if (this.editData) {
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['password'].setValue(this.editData.password);
    }
  }
  saveUser() {
    this.api.updateUser(this.userForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('User updated Successfully');
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating user');
      },
    });
  }
}
