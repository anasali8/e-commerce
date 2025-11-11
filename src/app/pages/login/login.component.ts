import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth/auth.service';

import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  
})
export class LoginComponent {
  messages: Message[] | undefined = [];

  constructor(
     private authService: AuthService,
        private messageService: MessageService,
        private spinner: NgxSpinnerService,
        private router : Router
  ) { }

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]),
  }
);

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  loginSubmit() {
    
    
    if (this.formGroup.valid) {
      this.spinner.show();
      this.authService.loginUser(this.formGroup.value).subscribe({
        next: (response) => {
          localStorage.setItem('userToken', response.token);
          this.spinner.hide();
          this.show('success', 'Success', 'Login Successful');
          this.router.navigate(['user']);
        },
        error: (err) => {
          console.log(err.error.message);
          this.spinner.hide();
          this.show('error', 'Error', err.error.message);
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup.errors);
      this.show('error', 'Error', 'Please fill the form correctly');
    }
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
