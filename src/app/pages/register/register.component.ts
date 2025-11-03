import { Component } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, DividerModule, CommonModule,PasswordModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor() { }
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]),
    rePassword : new FormControl('', [Validators.required]),
    // pattern for 11 digit phone number starting with 01 
    phone : new FormControl('', [Validators.required, Validators.pattern('^01[0-9]{9}$')]),
  }, this.passwordValidator
);

  // password matching validator
  passwordValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
  return password === rePassword ? null : { passwordMismatch: true };
  }

registerSubmit(){
   if (this.formGroup.valid) {
     console.log(this.formGroup.value);
     this.formGroup.reset();
   } else {
    this.formGroup.markAllAsTouched();
     console.log(this.formGroup.errors);
   }
   
    }

}