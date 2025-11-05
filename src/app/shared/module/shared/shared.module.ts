import { NgModule } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

import { MessagesModule } from 'primeng/messages';

import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

import { NgxSpinnerModule } from "ngx-spinner";
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
        FormsModule,
        ReactiveFormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        DividerModule,
        CommonModule,
        PasswordModule,
        ToastModule,
        RippleModule,
        NgxSpinnerModule
  ],
  exports: [
      FormsModule,
        ReactiveFormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        DividerModule,
        CommonModule,
        PasswordModule,
        ToastModule,
        RippleModule,
        NgxSpinnerModule  
  ],
  providers: [MessageService],

})
export class SharedModule { }
