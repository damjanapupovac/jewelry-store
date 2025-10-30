import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7069/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  });
    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getProductById(id: number): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  updateProduct(product: Product): Observable<Product> {
    const token = localStorage.getItem('token'); // 👈 ili gde god čuvaš JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product, { headers });
  }
}
