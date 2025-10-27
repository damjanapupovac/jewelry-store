import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';
import { ToastService } from '../../services/toast';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
  <div class="container mt-4">
    <h2>Edit product</h2>
    <div *ngIf="loading" class="text-muted">Loading...</div>
    <div *ngIf="notFound" class="alert alert-danger">
      Product not found or error.
    </div>
    <app-product-form *ngIf="!loading && product" [product]="product" (submitProduct)="handleSubmit($event)"/>
  </div>`
})
export class ProductEditComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading=false;
      },
      error: (err) => {
        console.error('Error during load: ', err);
        this.notFound=true;
        this.loading=false;
      }
    });
  }

  handleSubmit(updated: Partial<Product>): void {
    if (!this.product) return;
    const finalProduct = { ...this.product, ...updated };
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        this.toast.show('Product updated');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error during load: ', err)
    });
  }
}
