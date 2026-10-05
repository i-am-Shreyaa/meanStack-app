import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

interface ProductApiResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
   private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3001/api/products';

getProducts(
  page: number = 1,
  limit: number = 5,
  search: string = ''
): Observable<ProductApiResponse> {

  return this.http.get<ProductApiResponse>(
    `${this.apiUrl}?page=${page}&limit=${limit}&search=${search}`
  );
}
}
