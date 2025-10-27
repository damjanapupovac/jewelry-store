import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private toast: ToastService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error during load: ', err)
    });
  }

  deleteProduct(id: number): void {
    const potvrda = confirm('Are you sure you want to delete this product?');
    if (potvrda) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
        this.toast.show('Product deleted');
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => console.error('Error with deleting the product:', err)
      });
    }
  }
}
