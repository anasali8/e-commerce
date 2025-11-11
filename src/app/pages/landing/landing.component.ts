import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from '../../components/user-nav/user-nav.component';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenubarModule, RouterModule, UserNavComponent, UserFooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  features = [
    { title: 'Fast Shipping', description: 'Get your orders delivered within 48 hours' },
    { title: 'Secure Payment', description: 'Multiple payment options with 100% security' },
    { title: 'Easy Returns', description: '30-day hassle-free return policy' }
  ];

  items = [
    { label: 'Home', routerLink: '/' },
    { label: 'Products', routerLink: '/products' },
    { label: 'Contact', routerLink: 'user/contact' }
  ];
}
