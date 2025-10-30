import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toast: ToastService,
    public auth: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
    console.log('Loaded products:', data);
    this.products = data;
  },
  error: (err) => {
    console.error('Error loading products:', err);
    this.toast.show('Failed to load products');
  }
    });
  }

  isAdmin(): boolean {
    return this.auth.getRole() === 'Admin';
  }

  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toast.show('Product deleted');
        this.products = this.products.filter(p => p.id !== id);
      },
      error: () => {
        this.toast.show('Failed to delete product');
      }
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }
}
