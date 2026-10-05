import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService){}
  products: Product[] = [];
  searchText = '';

currentPage = 1;
pageSize = 5;
totalPages = 0;

ngOnInit(): void {
  this.loadProducts();
}

loadProducts(): void {
  this.productService
    .getProducts(this.currentPage, this.pageSize, this.searchText)
    .subscribe({
      next: (response) => {
        console.log('API Response:', response);

        this.products = response.data;
        this.totalPages = response.pagination.pages;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
}
searchProducts(): void {
  this.currentPage = 1;
  this.loadProducts();
}
}