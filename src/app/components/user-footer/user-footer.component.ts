import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule, RouterLink],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss'
})
export class UserFooterComponent {
    currentYear: number = new Date().getFullYear();

}
