import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  isBasketEmpty: boolean = false;
  cartItems: CartItem[] = [];
  total: number = 0;
  subTotal: number = 0;
  minTotal: number = 25;
  orderDifference: number = 0;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cartservice: CartService
  ) { }


  /*************   This handles the basket, display,add and remove items - clear basket ****/
  ngOnInit(): void {
    this.cartItems = this.cartservice.getCartItems();
    this.calculateTotal();
    this.calculateOrderDifference();
  }


  /**************  This is for calculating prices of cart   ****************************/
  calculateTotal(): void {
    this.subTotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.calculateOrderDifference();
  }

  calculateOrderDifference(): void {
    this.orderDifference = this.minTotal - this.total;
  }

  convertToDecimal(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  /**************  Increase, decrease and delete items from cart   ************************/
  // Add one item to cart
  increaseItem(product: any): void {
    const cartItem: CartItem = { ...product, quantity: 1 }; // Standardmäßig 1 Stück
    this.cartservice.addToCart(cartItem);
    this.calculateTotal();

  }

  decreaseItem(product: any): void {
    const cartItem: CartItem = { ...product, quantity: -1 }; // Standardmäßig 1 Stück
    this.cartservice.addToCart(cartItem);
    this.calculateTotal();
  }

  deleteItem(product: any) {
    this.cartservice.removeFromCart(product.id);
    this.cartItems = this.cartservice.getCartItems();
    this.calculateTotal();
  }


  /*************   This handles the sticky basket on scroll   *****************************/
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const basket = this.el.nativeElement.querySelector('#basketWrapper');
    const basketBox = this.el.nativeElement.querySelector('#basketBox');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 80) { // Passe den Wert an, ab wann der Basket fixed sein soll
      this.renderer.setStyle(basket, 'position', 'fixed');
      this.renderer.setStyle(basket, 'top', '0');
      this.renderer.setStyle(basket, 'right', '0');
      this.renderer.setStyle(basket, 'z-index', '4');
      this.renderer.setStyle(basketBox, 'height', '100vh');

    } else {
      this.renderer.setStyle(basket, 'position', 'absolute');
      this.renderer.setStyle(basket, 'top', '80px'); // Ursprüngliche Position
    }
  }
}
