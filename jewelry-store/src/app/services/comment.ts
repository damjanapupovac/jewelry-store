import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment'; // ✅ pravi model

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://localhost:7069/api/comments';

  constructor(private http: HttpClient) {}

  getComments(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/product/${productId}`);
  }

  addComment(comment: Partial<Comment>): Observable<Comment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<Comment>(this.apiUrl, comment, { headers });
  }
}
