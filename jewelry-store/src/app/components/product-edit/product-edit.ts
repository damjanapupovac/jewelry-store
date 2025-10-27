import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = { id: 0, name: '', description: '', price: 0, category: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error('Error during load: ', err)
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        this.toast.show('Product updated');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error during load: ', err)
    });
  }
}
