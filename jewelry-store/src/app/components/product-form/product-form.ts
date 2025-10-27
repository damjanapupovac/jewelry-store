import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent {
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: ''
  };

constructor(private productService: ProductService, private router: Router, private toast: ToastService) {}
  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (result) => {
        this.toast.show('Product added');
        this.newProduct = { id: 0, name: '', description: '', price: 0, category: '' };
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error during load: ', err)
    });
  }
}
