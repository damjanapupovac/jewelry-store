import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent {
  @Input() product: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    category: ''
  };

  @Output() submitProduct = new EventEmitter<Partial<Product>>();

  onSubmit(): void {
    this.submitProduct.emit(this.product);
  }
}
