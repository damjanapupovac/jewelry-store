import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  template:'<div class="container mt-4"><h2>Add new product</h2><app-product-form (submitProduct)="handleSubmit($event)" /></div>'
})
export class AddProductComponent {
  constructor(private productService: ProductService, private router: Router, private toast: ToastService) {}

  handleSubmit(product: Partial<Product>): void {
    this.productService.addProduct(product as Omit<Product, 'id'>).subscribe({
      next: () => {
        this.toast.show('Product added');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error during add:', err)
    });
  }
}
