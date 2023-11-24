import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeCartItem(cartItem.product.id).subscribe(() => {
      this.loadCartItems();
    });
  }

  checkout(): void {
    this.cartService.clearCart().subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
