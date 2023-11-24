import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.findCartItemById(product.id).subscribe((existingCartItem: CartItem | undefined) => {
      console.log(existingCartItem);
      
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        console.log(existingCartItem);
        
        this.cartService.updateCartItem(existingCartItem).subscribe(() => {
          console.log('Product added to cart:', product);
        });
      } else {
        const newCartItem: CartItem = {
          product: { ...product },
          quantity: 1,
          id: 0
        };
        this.cartService.addCartItem(newCartItem).subscribe(() => {
          console.log('Product added to cart:', product);
        });
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }
}
