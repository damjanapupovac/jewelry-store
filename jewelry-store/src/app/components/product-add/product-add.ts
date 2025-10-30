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
  templateUrl:'./product-add.html',
  styleUrls: ['./product-add.css']
  //template: `<p style="color: blue;">AddProductComponent is working</p>`
})

export class ProductAddComponent {
  product: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  category: '',
  imageUrl: ''
};
  constructor(private productService: ProductService, private router: Router, private toast: ToastService) {}

  handleSubmit(product: Partial<Product>): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toast.show('You must be logged in to add products');
      return;
    }
    this.productService.addProduct(product as Omit<Product, 'id'>).subscribe({
      next: () => {
        this.toast.show('Product added');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during add:', err);
        this.toast.show('Failed to add product');
      }
    });
  }
}
