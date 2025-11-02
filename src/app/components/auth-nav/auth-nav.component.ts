import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule,RippleModule, CommonModule],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.scss'
})
export class AuthNavComponent implements OnInit {
 items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Login',
                icon: 'pi pi-sign-in'
            },
            {
                label: 'Register',
                icon: 'pi pi-user-plus'
            }
        ];
    }
}
