import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { MenuModule } from 'primeng/menu';
import { jwtDecode } from "jwt-decode";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ButtonModule, FormsModule, MenuModule, RouterModule, RouterLink],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {

  items: MenuItem[] = [];
  accountItem: MenuItem[] = [];

  userName: string = '';
  isLoggedIn: boolean = false;


  constructor(private router: Router) { }
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-sign-in',
        path: '/user/home',
      },
      {
        label: 'Products',
        icon: 'pi pi-user-plus',
        path: './products',
      },
      {
        label: 'Contact',
        icon: 'pi pi-user-plus',
        path: '/user/contact',
      },
    ];

    this.accountItem = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Signout',
        icon: 'pi pi-sign-out',
        command: () => this.signout()
      }
    ];

    // Decode JWT to get user name
    const token = localStorage.getItem('userToken');
    if (token) {
      this.isLoggedIn = true;
      const decodedToken: any = jwtDecode(token);
      this.userName = decodedToken.name || 'User';
    }
  }

  signout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false; // Update authentication status
    this.router.navigate(['../auth/login']);
  }
}
