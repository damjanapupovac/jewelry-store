import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { ToastService } from '../../services/toast';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEditComponent implements OnInit {
  product: Partial<Product> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => this.product = data,
        error: (err) => {
          console.error('Failed to load product:', err);
          this.toast.show('Failed to load product');
        }
      });
    }
  }

  handleSubmit(updatedProduct: Partial<Product>): void {
    if (!updatedProduct.id) {
      this.toast.show('Product ID missing');
      return;
    }

    this.productService.updateProduct(updatedProduct as Product).subscribe({
      next: () => {
        this.toast.show('Product updated');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.toast.show('Failed to update product');
      }
    });
  }
}
