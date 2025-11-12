import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { CartServiceService } from '../../core/services/cart/cart-service.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [
    MenubarModule, 
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    RippleModule, 
    CommonModule, 
    ButtonModule, 
    FormsModule, 
    MenuModule, 
    RouterModule, 
    RouterLink
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit, OnDestroy {

  items: MenuItem[] = [];
  accountItem: MenuItem[] = [];
  userName: string = '';
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

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
      // {
      //   label: 'Profile',
      //   icon: 'pi pi-user',
      // },
      // {
      //   label: 'Settings',
      //   icon: 'pi pi-cog',
      // },
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
      
      // Subscribe to cart count updates
      this.cartService.cartCount$
        .pipe(takeUntil(this.destroy$))
        .subscribe(count => {
          this.cartItemCount = count;
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signout() {
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.cartItemCount = 0;
    this.router.navigate(['../auth/login']);
  }
}
