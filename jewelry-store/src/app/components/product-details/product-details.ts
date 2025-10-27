import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  imports: [CommonModule, RouterModule, CurrencyPipe],
})
export class ProductDetailsComponent {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }
}
