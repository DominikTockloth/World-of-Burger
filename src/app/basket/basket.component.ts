import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { OrderMessageComponent } from '../overlays/components/order-message/order-message.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    OrderMessageComponent
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})

export class BasketComponent implements OnInit {
  @Output() orderMessageOpened = new EventEmitter<void>();

  isOrderMessageOpen: boolean = false;
  isSelected: boolean = true;
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
    //Changes of basket get subscribed
    this.cartservice.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }


  /**************  This is for calculating prices of cart   ****************************/
  calculateTotal(): void {
    this.subTotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.subTotal;
    this.calculateOrderDifference();
  }

  calculateOrderDifference(): void {
    this.orderDifference = this.minTotal - this.total;
  }

  convertToDecimal(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }


  /**************  Increase, decrease and delete items from cart   ***********************/
  // Add one item to cart
  increaseItem(item: CartItem): void {
    this.cartservice.addToCart({ ...item, quantity: 1 });
  }

  decreaseItem(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartservice.addToCart({ ...item, quantity: -1 });
    } else {
      this.cartservice.removeFromCart(item.id);
    }
  }

  deleteItem(item: CartItem): void {
    this.cartservice.removeFromCart(item.id);
  }


  // This function displays the order difference, if total is under 25 and cartItems.length is bigger 0 
  showContent(): boolean {
    return this.total <= 25 && this.cartItems.length > 0;
  }

  // This function toggles the delivery or takeaway switch
  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  /***********************************  Handles the order-message overlay  *************************/
  openOrderMessage() {
    this.isOrderMessageOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.cartservice.clearCart();
      this.isOrderMessageOpen = false;
      document.body.style.overflow = '';
    }, 3500)
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
