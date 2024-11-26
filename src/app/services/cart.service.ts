import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})

export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable(); // Beobachtbarer Warenkorb
    private cartItems: CartItem[] = [];

    addToCart(cartItem: CartItem): void {
        const existingItem = this.cartItems.find(item => item.id === cartItem.id);

        if (existingItem) {
            existingItem.quantity += cartItem.quantity;
        } else {
            this.cartItems.push(cartItem);
        }

        this.cartItemsSubject.next([...this.cartItems]); // Änderungen weitergeben
    }

    removeFromCart(itemId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.cartItemsSubject.next([...this.cartItems]); // Änderungen weitergeben
    }

    getCartItems(): CartItem[] {
        return [...this.cartItems];
    }

    clearCart(): void {
        this.cartItems = [];
        this.cartItemsSubject.next([...this.cartItems]);
    }
}