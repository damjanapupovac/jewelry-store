import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommentService } from '../../services/comment';
import { Comment } from '../../models/comment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  imports: [CommonModule, RouterModule, CurrencyPipe, FormsModule],
})
export class ProductDetailsComponent {
  product: Product | null = null;
  comments: Comment[] = [];
  newCommentText: string = '';
  isLoggedIn: boolean = false;


  constructor(
  private route: ActivatedRoute,
  private productService: ProductService,
  private commentService: CommentService) 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.loadComments();
    });

    this.isLoggedIn = !!localStorage.getItem('token');
  }

  loadComments(): void {
  if (!this.product?.id) return;
  this.commentService.getComments(this.product.id).subscribe({
    next: (data) => this.comments = data,
    error: () => console.error('Failed to load comments')
  });
  }

  submitComment(): void {
    if (!this.newCommentText.trim() || !this.product?.id) return;

    const comment: Partial<Comment> = {
      productId: this.product.id,
      text: this.newCommentText
    };

    this.commentService.addComment(comment).subscribe({
      next: (c) => {
        this.comments.unshift(c);
        this.newCommentText = '';
      },
      error: () => console.error('Failed to add comment')
    });
  }
}
