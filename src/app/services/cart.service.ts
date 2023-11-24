import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartUrl = 'http://localhost:3000/cart';

    constructor(private http: HttpClient) { }

    getCartItems(): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(this.cartUrl);
    }

    findCartItemById(productId: number): Observable<CartItem | undefined> {
        return this.getCartItems().pipe(
            map((cartItems: CartItem[]) => cartItems.find(item => item.product.id === productId))
        );
    }

    updateCartItem(cartItem: CartItem): Observable<CartItem> {
        const url = `${this.cartUrl}/${cartItem.product.id}`;
        return this.http.put<CartItem>(url, cartItem);
    }

    addCartItem(newCartItem: CartItem): Observable<CartItem> {
        return this.findCartItemById(newCartItem.product.id).pipe(
            switchMap(existingCartItem => {
                if (existingCartItem) {
                    existingCartItem.quantity += newCartItem.quantity;
                    return this.updateCartItem(existingCartItem);
                } else {
                    return this.http.post<CartItem>(this.cartUrl, newCartItem);
                }
            })
        );
    }

    removeCartItem(id: number): Observable<CartItem> {
        const url = `${this.cartUrl}/${id}`;
        return this.http.delete<CartItem>(url);
    }

    clearCart(): Observable<any> {
        return this.getCartItems().pipe(
            switchMap((cartItems: CartItem[]) => {
                const removeItemRequests: Observable<any>[] = [];
                cartItems.forEach((item: CartItem) => {
                    removeItemRequests.push(this.removeCartItem(item.id));
                });
                return forkJoin(removeItemRequests);
            })
        );
    }
}
