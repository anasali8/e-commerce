import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { log } from 'node:console';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-nav',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
    templateUrl: './user-nav.component.html',
    styleUrl: './user-nav.component.scss'
})
export class UserNavComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
<<<<<<< Updated upstream
                label: 'Login',
                icon: 'pi pi-sign-in',
                path: 'login'
            },
            {
                label: 'Register',
                icon: 'pi pi-user-plus',
                path: 'register'
            }
=======
                label: 'Home',
                icon: 'pi pi-home',
                path: 'home',

            },
            {
                label: 'Cart',
                icon: 'pi pi-cart-arrow-down',
                path: 'cart',

            },
            {
                label: 'products',
                icon: 'pi pi-box',
                path: 'products',
            },
            {
                label: 'Categories',
                icon: 'pi pi-bars',
                path: 'categories',
            },
>>>>>>> Stashed changes
        ];
    }
}
