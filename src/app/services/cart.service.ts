import { Injectable } from "@angular/core";
import { Hamburger } from '../models/hamburger.model';

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
    private cart: CartItem[] = [];


    // Add items to cart
    addToCart(item: CartItem): void {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push(item);
        }
    }


    // Delete item from cart
    removeFromCart(itemId: number): void {
        this.cart = this.cart.filter(item => item.id !== itemId);
    }
    // Get all added cart items
    getCartItems(): CartItem[] {
        return this.cart;
    }

    // Delete complete cart
    clearCart(): void {
        this.cart = [];
    }
}