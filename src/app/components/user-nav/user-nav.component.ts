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
                label: 'Home',
                icon: 'pi pi-sign-in',
            },
            {
                label: 'Cart',
                icon: 'pi pi-user-plus',
            },
             {
                label: 'products',
                icon: 'pi pi-user-plus',
            },
             {
                label: 'Categories',
                icon: 'pi pi-user-plus',
            },
             {
                label: 'Brands',
                icon: 'pi pi-user-plus',
            }
        ];
    }
}
