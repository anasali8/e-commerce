import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  messages: Message[] | undefined = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  formGroup: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
        ),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.passwordValidator
  );

  // enable button when form is valid
  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  // password matching validator
  passwordValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }

  registerSubmit() {
    if (this.formGroup.valid) {
      this.spinner.show();

      this.authService.registerUser(this.formGroup.value).subscribe({
        next: () => {
          this.spinner.hide();
          this.show('success', 'Success', 'Registeration Successful');
          this.router.navigate(['../auth/login']);
        },
        error: (err) => {
          this.spinner.hide();
          this.show('error', 'Error', err.error.message);
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      console.log(this.formGroup.errors);
    }
  }

  show(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
  async confirmExit(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        header: 'Confirmation',
        message: msg,
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          });
          resolve(true);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          });
          resolve(false);
        },
      });
    });
  }
}
