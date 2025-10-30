import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements DoCheck {
  cartCount: number = 0;

  constructor(
    public auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngDoCheck(): void {
    this.cartCount = this.cartService.getTotalQuantity();
  }

  logoSrc: string = 'assets/img/background.png';
  toggleLogo(event: Event): void {
    event.preventDefault();
    this.logoSrc = 'assets/img/background.gif';
  }
}
